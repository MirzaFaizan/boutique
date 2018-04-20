var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var PackageSchema = new Schema(
  {
    package_number: {type: String, required: true, max: 100},
    items: [{type:String,required:true}],
    shop_id: {type: String,  max: 100},
    date_sent: {type: Date},
  }

);

//Export model
module.exports = mongoose.model('Package', PackageSchema);
