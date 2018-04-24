var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var EmpSchema = new Schema(
  {
    Emp_name: {type: String, required: true, max: 100},
    Emp_password: {type: String, required: true, max: 50},
    Emp_cnic: {type: String, required: true,  max: 20},
    Emp_type: {type: String, required: true,  max: 50},
    shop_id:  {type: String, max:20},
  }

);
 
//Export model
module.exports = mongoose.model('Employee',EmpSchema);