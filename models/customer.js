var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CustSchema = new Schema(
  {
    cust_name: {type: String, required: true, max: 100},
    cust_id: {type: String,  max: 100},
    cust_phone: {type: String, required: true, max: 100},
    cust_address: {type: String, required: true, max: 100},
    cust_gender: {type: String, required: true, max: 100},
    last_visit: {type: Date},
  }

);

//Export model
module.exports = mongoose.model('Customer', CustSchema);
