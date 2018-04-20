var express= require('express'); 
var app= express();
var bcrypt= require('bcryptjs');
var jwt    = require('jsonwebtoken');
var config= require('../DBconfig');
///Connect to DataBasae
var mongoose = require('mongoose');
mongoose.connect(config.database);
// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
//Get the default connection
var db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
(db.on('error', console.error.bind(console, 'MongoDB connection error:')));

var emp_instance =require('../models/employee');

//Function to Authenticate and Authorize head
exports.loginandGetToken = function(req, res)
 {

var nam= req.body.name;
var pass= req.body.password;
if(nam != 'nerd')
{
    return res.send({msg:'invalid Username'});
}
else if(pass != "1234")
{
   return res.send({msg:'password Invalid'});
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
        return res.json({
            success: true,
            message: 'Enjoy your token!',
            token: token,
            type: 'head'
          });     
}
};

//Function to Create new Employee
exports.CreatenewEmp= function(req, res)
 {
  //  bcrypt.hash(req.body.password, 10, function(err, hash) {
    //    req.body.password= hash;
      //  console.log(req.body.password);
      
     //console.log(req.body.name);
     var Emp = new emp_instance({Emp_name:req.body.name,Emp_password:req.body.password,
        Emp_cnic:req.body.cnic, 
        Emp_type:req.body.type});
    Emp.save(function (err) {
        if (err)
         return handleError(err);
      
        else
          res.sesnd({msg:"Data Entered Successfully"});
          console.log("Data entered");
        // saved!
    });
//});
}
 //Function to Fetch all Employyess
 exports.fetchallemps= function(req,res){
    emp_instance.find()
    .then(Emp => {
       return res.json(Emp);
    }).catch(err => {
        return res.status(500).send({
            message: err.message || "Some error occurred while retrieving all Employeess."
        });
    });
};
exports.fetchoneemp= function(req,res){
    emp_instance.findOne(  
        // query
        {Emp_cnic:req.body.cnic},
    
        {Emp_name: true,Emp_cnic:true,Emp_type:true},
    
        // callback function
        (err, Emp) => {
            if (err) return res.status(200).send(err)
            if(Emp==null)
            return res.status(200).json(message='No Employee With this Cnic')
            else
            return res.status(200).json(Emp)
        }
    );
};
exports.Deleteemp= function(req, res)
 {
  emp_instance.findOneAndRemove({Emp_cnic:req.body.cnic})
  .then(Emp => {
      if(!Emp) {
          return res.status(404).send({
              message: "Employee not found with cnic " + req.body.cnic
          });
      }
      res.send({message: "Employee deleted successfully!"});
  }).catch(err => {
      if(err.kind === 'Emp_cnic' || err.name === 'NotFound') {
          return res.status(404).send({
              message: "Employee not found with cnic " + req.body.cnic
          });                
      }
      return res.status(500).send({
          message: "Could not delete Employee with cnic " + req.params.cnic
      });
  });
 }