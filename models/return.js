var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ReturnSchema = new Schema(
  {
    article_id: {type: String, required: true, max: 100},
    refund_amount: {type: String,  max: 100},
    date_refund: {type: Date},
    shop_id: {type: String,  max: 100},
    cust_id: {type: String,  max: 100},
  }

);

//Export model
module.exports = mongoose.model('Return', ReturnSchema);
