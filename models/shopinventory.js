var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ShopInventorySchema = new Schema(
  {
    item_id: {type:Number},
    shop_id: {type: String, max: 100},
  }

);

//Export model
module.exports = mongoose.model('Shopinventory', ShopInventorySchema);
