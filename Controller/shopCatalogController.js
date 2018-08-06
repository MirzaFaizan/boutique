var express= require('express');
var app= express();
var jwt    = require('jsonwebtoken');
///Connect to DataBasae
var mongoose = require('mongoose');
var config= require('../DBconfig');
mongoose.connect(config.database);
// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
//Get the default connection
var db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
(db.on('error', console.error.bind(console, 'MongoDB connection error:')));

var shop_inventory = require('../models/shopinventory');
var emp_instance= require('../models/employee');
var pakg_instance= require('../models/package');
var sales_instance= require('../models/sales');
var article_instance=require('../models/article');  
var cusDetails_instance=require('../models/customerDetails');
var article_instance = require('../models/article');
var shop_employee_instance = require('../models/shopEmployee');
//Function To Login

exports.loginandGetToken = function(req, res)
 {
    emp_instance.findOne(
        // query
        {Emp_name:req.body.name}, (err, Emp) => {
if (err) return res.status(200).send(err)
if(Emp==null)
{
   return res.status(200).json(message='Invalid username')
}
else if(req.body.password != Emp.Emp_password)
{
   return res.send({msg:'password Invalid'});
}
else if(Emp.Emp_type !='shop')
{
   return res.send({msg:'This user is not allowed to Access this Domain'});
}
else
{
   // res.send('login Successfull and token generated');
    //Generate JWT Token
    this.shopID=Emp.shop_id;
    const payload = {
        name: req.body.name
      };
          var token = jwt.sign(payload, config.secret, {expiresIn: 86400 // expires in 24 hours
        });

 //          return the information including token as JSON
        return res.json({
            success: true,
            message: 'logged in!!! Enjoy your token!',
            token: token,
            type: Emp.Emp_type,
            shopID:Emp.shop_id
          });
}
        });
};

//Function to recieve a pakage
exports.RecievePakg= function(req,res){
     
    //Fetch Pakage using its pakage number
    pakg_instance.findOne(
        // query
        {package_number:req.body.number},
        // callback function
        (err, package) => {
            if (err) return res.json(err)
            if(package==null)
            return res.json(message='No Package With this number')
            else
            {
                if(package.shop_id != req.body.shop_id)
                {
                    res.json({message:'This pakckage is not for this shop '});
                }
               else if(package.status != 'delivered')
               {
                res.json({message:'This pakckage has already been recieved!!! '});
               }
               else{
                package.status='Recived at shop  ' +(req.body.shop_id);
            
                package.save();
                //Save pakage items in ShopInventory
                for(var i=0; i<package.items.length; i++)
                {
                       
                       article_instance.findOne(
                           {item_id:package.items[i]},
                           {item_id:true,item_name:true,price:true,id2:true,factory_price:true},
                        // callback function
                        (err, art) => {
                            if (err) return res.json(err)
                       shopInventory= new shop_inventory({item_id:art.item_id,item_name:art.item_name,
                       price:art.price,id2:art.id2,shop_id:req.body.shop_id,factory_price:art.factory_price}); 
                       shopInventory.save(function (err) {
                        if (err)
                         return res.json(err);});
                });
            }
                res.json({message:'package Recieved,items added to shop inventory'});  
            }
        }
        });
}

//function to find customers by phone number
exports.searchCustomers= function(req,res){
    cusDetails_instance.findOne(  
        
        // query
        {customerPhone:req.body.customerPhone},
    
        
    
        // callback function
        (err, customerDetails) => {
            if (err) return res.status(200).send(err)
            if(customerDetails==null)
            return res.status(200).json(message='No customer with this phone number')
            else
            return res.status(200).json(customerDetails)
        }
    );
};


//Function to make new Sale
exports.makesale= function(req,res){
req.body.products= req.body.products.split(',').map(function(i){
    return parseInt(i);})
    var salesmodel= new sales_instance({total:0,date_sale:req.body.sale,shop:req.body.shopID});  
    //fetch details of all products from articles collection
    for(var i=0; i<req.body.products.length; i++)
    {
       article_instance.findOne(     
        // query
        {item_id:req.body.products[i]},
        {item_id:true,item_name: true,price: true,factory_price:true},function(err,article){
            if (err) return res.json(err);
            else{
             salesmodel.products.push(article);
             salesmodel.total=salesmodel.total+article.price;
            }
            if(salesmodel.products.length === req.body.products.length)
            {
                    console.log(salesmodel.products.length);
                    salesmodel.save(function(){});
    //Delete all items from Articles collection
         shop_inventory.deleteMany({item_id: {$in:req.body.products}},function(err){
         if(err)return res.json(err);})
    //Delete all items from shopInventory collection
         article_instance.updateMany({item_id: {$in:req.body.products}},{$set: { sold : true } },function(err){
         if(err)return res.json(err);})
            }
 });
    }
   
 res.json('Done');   
}



/////////////Show Inventory by Shop Number function

exports.shopinventoryshow= function(req,res){
    shop_inventory.find(
    // query
    {shop_id:req.body.shopID},
    // callback function
    (err, shop) => {
        if (err) return res.json(err)
        if(shop==null)
        return res.json(message='No Article at this Shop')
        else
        {
            return res.json(shop);
            res.json({message:'Displaying All Inventory of Shop: ' +(req.body.shopID)});
            }
        });
}

//function to enter customer details
exports.cusDetails = function(req , res){
    var cusD = new cusDetails_instance({
        customerName: req.body.cN,
        customerPhone: req.body.cP,
});
cusD.save(function (err) {
    if (err)
        return res.json(err);
    else
        res.send({
            msg: "Data Entered Successfully"
        });
    console.log("Data entered");
    // saved!
});
};

//function to fetch customer details
exports.fetchCusDetails = function(req , res){
    cusDetails_instance.find()
    .then(cus =>{
    if(cus.length == 0){
        res.json({
            msg: "No data available to show"
        })
    } else
    res.json(cus);
    }).catch(err => {
        message: err.message || "Some errors occurred while retrieving customer details."
    });
}

//function to fetch customer details
exports.fetchSpecCusDetails = function(req , res){
    cusDetails_instance.find({
        customerPhone:req.body.cP
    })
    .then(cus =>{
    if(cus.length == 0){
        res.json({
            msg: "No data available to show"
        })
    } else
    res.json(cus);
    }).catch(err => {
        message: err.message || "Some errors occurred while retrieving customer details."
    });
}

//function to find article by type
exports.Articletype= function(req,res){
    article_instance.find(  
        
        // query
        {item_type:req.body.type},            
    
        // callback function
        (err, article) => {
            if (err) return res.status(200).send(err)
            if(article==0)
            return res.status(200).json(message='No Article With this type')
            else
            return res.status(200).json(article)
        }
    );
};


//SHOP emp curd Operations

//Function to Create new Employee
exports.CreatenewEmp = function (req, res) {
    var Emp = new shop_employee_instance({
        emp_name: req.body.name,
        emp_cnic: req.body.cnic,
        emp_type: req.body.type,
        shop_id: req.body.shopID,
        emp_phone: req.body.phone,
    });
    Emp.save(function (err) {
        if (err)
            return res.json(err);

        else
            res.send({
                msg: "Data Entered Successfully"
            });
        console.log("Data entered");
        // saved!
    });
    //});
}



//Function to Fetch all Employyess
exports.fetchallemps = function (req, res) {
    shop_employee_instance.find()
        .then(Emp => {
            if (Emp == null) {
                res.json({
                    message: 'No Employee Found'
                })
            } else
                return res.json(Emp);
        }).catch(err => {
            return res.status(500).send({
                message: err.message || "Some error occurred while retrieving all Employeess."
            });
        });
};
//Function To Fetch an Employee
exports.fetchoneemp = function (req, res) {
    shop_employee_instance.findOne(
        // query
        {
            emp_cnic: req.body.cnic
        },

        // callback function
        (err, Emp) => {
            if (err) return res.status(200).send(err)
            if (Emp == null)
                return res.status(200).json(message = 'No Employee With this Cnic')
            else
                return res.status(200).json(Emp)
        }
    );
};
//Function to Delete an Employee
exports.Deleteemp = function (req, res) {
    shop_employee_instance.findOneAndRemove({
            emp_cnic: req.body.cnic
        })
        .then(Emp => {
            if (!Emp) {
                return res.status(404).send({
                    message: "Employee not found with cnic " + req.body.cnic
                });
            }
            res.send({
                message: "Employee deleted successfully!"
            });
        }).catch(err => {
            if (err.kind === 'Emp_cnic' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Employee not found with cnic " + req.body.cnic
                });
            }
            return res.status(500).send({
                message: "Could not delete Employee with cnic " + req.params.cnic
            });
        });
}


