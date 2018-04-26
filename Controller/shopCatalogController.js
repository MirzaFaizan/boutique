var express= require('express');
var app= express();
var bcrypt= require('bcryptjs');
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
            if (err) return res.status(200).send(err)
            if(package==null)
            return res.status(200).json(message='No Package With this number')
            else
            {
                if(package.shop_id != req.body.shopID)
                {
                    res.json({message:'This pakckage is not for this shop '});
                }
               else{
                package.status='Recived at shop  ' +(req.body.shopID);
                //var len= package.items.length();
                package.save();
                //Save pakage items in ShopInventory
                for(var i=0; i<package.items.length; i++)
                {
                    shopInventory= new shop_inventory({item_id:package.items[i],shop_id:req.body.shopID});
                       shopInventory.save(function (err) {
                        if (err)
                         return handleError(err);});
                }
                res.json({message:'package Recieved,items added to shop inventory'});
               }
            }
        }
    );
}

//Function to make new Sale
exports.makesale= function(req,res){
    var salesmodel= new sales_instance({total:0,date_sale:req.body.sale,shop:req.body.shopID});  
    //fetch details of all products from articles collection
    for(var i=0; i<req.body.products.length; i++)
    {
       article_instance.findOne(     
        // query
        {item_id:req.body.products[i]},
        {item_id:true,item_name: true,price: true},function(err,article){
            if (err) return res.status(200).send(err)
            else{
             salesmodel.products.push(article);
             salesmodel.total=salesmodel.total+article.price;
            }
            if(i=req.body.products.length)
            {
                    salesmodel.save(function(){
                    console.log(salesmodel);});
    //Delete all items from Articles collection
        article_instance.deleteMany(req.body.products.item_id,function(err){
        if(err)return handleError(err);})
    //Delete all items from shopInventory collection
        shop_inventory.deleteMany(req.body.products.item_id,function(err){
        if(err)return handleError(err); })
            }
 });
    }
   
 res.json('Done');   
}

/////////////Show Inventory by Shop Number function

exports.shopinventoryshow= function(req,res){

    shop_inventory.findOne(

        // query
        {shop_id:req.body.shopID},
        // callback function
        (err, shop) => {
            if (err) return res.status(200).send(err)
            if(shop==null)
            return res.status(200).json(message='No Article at this Shop')
            else
            {
                return res.json(shop);
                res.json({message:'Displaying All Inventory of Shop: ' +(req.body.shopID)});
                Console.log('ShowInventory Successfully fired.')
               }
            });
}
