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
                package.status= 'Recived at shop'+req.body.shopID;
                res.json({message:'package Recieved,items added to shop inventory'}); 
               }
            }
        }
    );
    //Get package Number
    //Get Shop Id
    //Get Array Objects of Package Article Array
    //Insert articleid, shop id,article quantity as single object in shopinventory collection
}