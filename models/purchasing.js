var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var PurchaseSchema = new Schema(
  {
    item_name: {type: String, required: true, max: 100},
    item_desc: {type: String, required: true, max: 100},
    price: {type: Number},
    date_added: {type: Date}
   }
);

//Export model
module.exports = mongoose.model('Purchasing', ArticleSchema);