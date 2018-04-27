var mongoose = require('mongoose');

var Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);

var ArticleSchema = new Schema(
  {
    item_name: {type: String, required: true, max: 100},
    item_type: {type: String, required: true, max: 100},
    price: {type: Number},
    date_added: {type: Date},
    item_id: {type: Number},
  }
);
ArticleSchema.plugin(AutoIncrement, {inc_field: 'item_id'});
//Export model
module.exports = mongoose.model('Article', ArticleSchema);