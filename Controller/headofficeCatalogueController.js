var express= require('express'); 
var app= express();

var jwt    = require('jsonwebtoken');
var config= require('../DBconfig');

//Function to Authenticate and Authorize Admin
exports.loginandGetToken = function(req, res)
 {
console.log(req.body.name);
var nam= req.body.name;
var pass= req.body.password;
if(nam != 'nerd')
{
    res.send('invalid Username');
}
else if(pass != "1234")
{
    res.send('password Invalid');
}
else
{
   // res.send('login Successfull and token generated');
    //Generate JWT Token
    const payload = {
        name: nam 
      };
          var token = jwt.sign(payload, config.secret, {expiresIn: 86400 // expires in 24 hours
        });
        
 //          return the information including token as JSON
          res.json({
            success: true,
            message: 'Enjoy your token!',
            token: token
          });
          module.exports= token;       
}
};
///Connect to DataBasae
var mongoose = require('mongoose');
mongoose.connect(dbconfig.database);
// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
//Get the default connection
var db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
(db.on('error', console.error.bind(console, 'MongoDB connection error:')));

var emp_instance= require('../models/employee');
//Function to Create new Employee
exports.CreatenewEmp= function(req, res)
 {
    // Validate request
    if(!req.body.content) {
      return res.status(400).send({
          message: "Employee content can not be empty"
      });
  }
    var Empmodel = new emp_instance({ Emp_name:req.body.name, Emp_password:req.body.password , Emp_cnic:req.body.cnic, 
     Emp_type:req.body.type });
    Empmodel.save(function (err) {
        if (err)
         return handleError(err);
      
        else
          res.render('index', { title: 'Employee/enter' });
          console.log("Data entered");
        // saved!
    });
 }