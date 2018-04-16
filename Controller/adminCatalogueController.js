var express= require('express'); 
var app= express();
///Connect to DataBasae
var mongoose = require('mongoose');
var dbconfig= require('../DBconfig');
mongoose.connect(dbconfig.database);
// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
//Get the default connection
var db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
(db.on('error', console.error.bind(console, 'MongoDB connection error:')));

var article_instance = require('../models/article');
//Function to Create new Article
exports.CreatenewArticle= function(req, res)
 {
    // Validate request
    if(!req.body.content) {
      return res.status(400).send({
          message: "Article content can not be empty"
      });
  }
    var articlemodel = new article_instance({ item_name:req.body.name, item_type:req.body.type , price:req.body.price, 
        date_added: req.body.date, item_id:req.body.id });
    articlemodel.save(function (err) {
        if (err)
         return handleError(err);
      
        else
          res.render('index', { title: 'article/enter' });
          console.log("Data entered");
        // saved!
    });
 }
 exports.DeleteArticle= function(req, res)
 {
  article_instance.findByIdAndRemove(req.params.id)
  .then(article => {
      if(!article) {
          return res.status(404).send({
              message: "Article not found with id " + req.params.id
          });
      }
      res.send({message: "Article deleted successfully!"});
  }).catch(err => {
      if(err.kind === 'ObjectId' || err.name === 'NotFound') {
          return res.status(404).send({
              message: "Article not found with id " + req.params.id
          });                
      }
      return res.status(500).send({
          message: "Could not delete Article with id " + req.params.id
      });
  });
 }