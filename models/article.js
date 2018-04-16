var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ArticleSchema = new Schema(
  {
    item_name: {type: String, required: true, max: 100},
    item_type: {type: String, required: true, max: 100},
    price: {type: String,  max: 100},
    date_added: {type: Date},
    item_id: {type: String,  max: 100},
  }

);

// Virtual for author's full name
ArticleSchema
.virtual('name')
.get(function () {
  return this.item_name + ', ' + this.item_type;
});

// Virtual for author's URL
ArticleSchema
.virtual('url')
.get(function () {
  return '/catalog/author/' + this._id;
});

//Export model
module.exports = mongoose.model('Article', ArticleSchema);