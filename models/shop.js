var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ShopSchema = new Schema(
  {
    shop_name: {type: String, required: true, max: 100},
    shop_address: {type: String, required: true, max: 100},
    shop_id: {type: String, required: true, max: 100},
  }

);

//Export model
module.exports = mongoose.model('Shop', ShopSchema);
