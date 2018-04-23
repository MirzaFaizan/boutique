var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ShopPackageSchema = new Schema(
  {
    package_number: {type: String, required: true, max: 100},
    items: [],
    shop_id: {type: String,  max: 100},
    date_received: {type: Date},
    status: {type: String,  max: 100},
  }

);

//Export model
module.exports = mongoose.model('Shoppackage', ShopPackageSchema);
