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
