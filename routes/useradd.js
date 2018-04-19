var Demo = require('../models/employeehashed');
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var SALT_WORK_FACTOR = 10;

//////////////////Instance of model with predefine data

//////////////var articlemodel = new article_instance({ item_name: 'Pot', item_type: 'Utensil', price: '300', date_added: '02/01/1988', item_id: '01'});

/////////creating route within article for entering data

router.get('/enter', function(req, res, next) {
////////////////calling save function on model variable
var connStr = 'mongodb://localhost:27017/boutique';
mongoose.connect(connStr, function(err) {
    if (err){ throw err;}
    else{
    console.log('Successfully connected to MongoDB');}
});



Demo.create({
  username: 'Zaki',
  password: '12345',
  cnic: '6110187763585',
  type: 'Shop'
}, function(err, demo) {
  if (!err) {
    // Verify password with callback => Valid (callback)
    demo.verifyPassword('mySecretPassword', function(err, valid) {
      if (err) {
        console.log(err)
      } else if (valid) {
        console.log('Valid (callback)');
      } else {
        console.log('Invalid (callback)');
      }
    });
    // Verify password using promise => Valid (promise)
    demo.verifyPassword('mySecretPassword')
      .then(function(valid) {
        if (valid) {
          console.log('Valid (promise)');
        } else {
          console.log('Invalid (promise)');
        }
      })
      .catch(function(err) {
        console.log(err);
      });
    // Verify password synchronously => Invalid (sync)
    var valid = demo.verifyPasswordSync('bogusPassword');
    if (valid) {
      console.log('Valid (sync)');
    } else {
      console.log('Invalid (sync)');
    }
  res.send('New user created with password hashed.')}
});
// The password field is automatically encrypted when an instance is saved
// Use the static encryption method to return encrypted password values for
// other use. The values will be encrypted using the actual bcrypt settings
// assigned to the password field (see bcrypt rounds below)
Demo.encryptPassword('anotherSecret', function(err, encryptedValue) {
  if (err) {
    console.log(err);
  } else {
    // Do something with encrypted data
    console.log('Encrypted password is ' + encryptedValue);
  }
});
// Using promises
Demo.encryptPassword('anotherSecret')
  .then(function(encryptedValue) {
    // Do something with encrypted data
    console.log('Encrypted password is ' + encryptedValue);
  })
  .catch(function(err) {
    console.log(err);
  });
});

module.exports = router;
