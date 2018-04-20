var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var SaleSchema = new Schema(
  {
    article_id: {type: String, required: true, max: 100},
    article_name: {type: String, required: true, max: 100},
    price: {type: String,  max: 100},
    tax: {type: String,  max: 100},
    sale_value: {type: String,  max: 100},
    date_sale: {type: Date},
    item_id: {type: String,  max: 100},
    shop: {type: String,  max: 100},
    cust_name: {type: String,  max: 100},
    cust_id: {type: String,  max: 100},
  }

);

//Export model
module.exports = mongoose.model('Sale', SaleSchema);
