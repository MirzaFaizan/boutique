var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ShopEmpSchema = new Schema(
  {
    emp_name: {type: String, required: true, max: 100},
    emp_cnic: {type: String, required: true,  max: 20},
    emp_type: {type: String, required: true,  max: 50},
    shop_id:  {type: String, max:20},
    emp_phone: {type: String, required: true,  max: 50},
  }

);

//Export model
module.exports = mongoose.model('ShopEmployee',ShopEmpSchema);
