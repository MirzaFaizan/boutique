var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var SaleSchema = new Schema(
  {
    products:[{article_id: {type: String, required: true, max: 100},
    article_name: {type: String, required: true, max: 100},
    price: {type: String,  max: 100}}],
    date_sale: {type: Date},
    shop: {type: String,  max: 100},
  }
);

//Export model
module.exports = mongoose.model('Sale', SaleSchema);
