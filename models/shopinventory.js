var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ShopInventorySchema = new Schema(
  {
    item_id: {type: String,  max: 100},
    num_stock: {type: Number,  max: 100},
    shop_id: {type: String, required: true, max: 100},
  }

);

//Export model
module.exports = mongoose.model('Shopinventory', ShopInventorySchema);
