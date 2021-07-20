// 'use strict';
// var mongoose  = require('mongoose');
// var bcrypt    = require('bcryptjs');
// var config    = require('../config');
// var moment    = require('moment');

// var paginate  = require('mongoose-paginate');
// var Schema = mongoose.Schema;

// // creating schema for user
// var UserSchema = new Schema({
//   sn:             { type: String },
//   email:          { type: String },
//   password:       { type: String },
//   permissions:    [{ type: String }],
//   active:        { type: Number, default: 1 }
// }, {versionKey: false});

// UserSchema.plugin(paginate);

// // Add a pre save hook
// UserSchema.pre('save', function preSaveHook(next) {
//   let model = this;
//   bcrypt.genSalt(config.SALT_LENGTH, function genSalt(err, salt) {
//     if(err) {
//       return next(err);
//     }
//     bcrypt.hash(model.password, salt, function hashPasswd(err, hash) {
//       if(err) {
//         return next(err);
//       }
//       var now = moment().toISOString();
//       model.password = hash;
//       next();
//     });
//   });
// });

// // Compare Passwords Method
// UserSchema.methods.checkPassword = function checkPassword(password, cb) {
//   //  console.log("hello");
//   bcrypt.compare(password, this.password, function done(err, res) {
//     if(err) {
//       return cb(err);
//     }
//     cb(null, res);
//     console.log(res);
//   });
// };

// // Expose the User Model
// module.exports = mongoose.model('admin', UserSchema);
