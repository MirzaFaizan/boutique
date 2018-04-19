var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    SALT_WORK_FACTOR = 10;

var User = new Schema({
    username: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true },
    cnic: {type: String, required: true,  max: 20},
    type: {type: String, required: true,  max: 50},
});



User.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

User.plugin(require('mongoose-bcrypt'));

module.exports = mongoose.model('Demo', User);
