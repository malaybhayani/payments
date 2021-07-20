var debug   = require('debug')('api:dal-user');
var moment  = require('moment');
var _       = require('lodash');
var User        = require('../models/user');
var mongoUpdate = require('../lib/mongo-update');
// const ratehelper = require('../models/ratehelper');
// const course = require('../models/course');
// const category = require('../models/category');
var returnFields = User.whitelist;
var population = [
  {
    select:'-password'
  }
];

exports.create = function create(userData, cb) {
  var searchQuery = {email:userData.email};

  // Make sure user does not exist
  User.findOne(searchQuery, function userExists(err, isPresent) {
    if(err) {
      return cb(err);
    }

    if(isPresent) {
      return cb(new Error('User already exists'));
    }


    // Create user if is new.
    var userModel  = new User(userData);

    userModel.save(function saveUser(err, data) {
      if (err) {
        return cb(err);
      }


      exports.get({ _id: data._id }, function (err, user) {
        if(err) {
          return cb(err);
        }

        cb(null, user);

      });

    });

  });

};

exports.delete = function deleteItem(query, cb) {
  User
    .findOne(query, returnFields)
    .populate(population)
    .exec(function deleteUser(err, user) {
      if (err) {
        return cb(err);
      }

      if(!user) {
        return cb(null, {});
      }

      user.remove(function(err) {
        if(err) {
          return cb(err);
        }

        cb(null, user);

      });

    });
};

exports.update = function update(query, updates,  cb) {
  var now = moment().toISOString();
  var opts = {
    'new': true,
    safe: true, upsert: true,
    select: returnFields
  };

  // updates = mongoUpdate(updates);

  User
    .findOneAndUpdate(query, updates, opts)
    .populate(population)
    .exec(function updateUser(err, user) {
      if(err) {
        return cb(err);
      }

      cb(null, user || {});
    });
};

exports.get = function get(query, cb) {
  User
    .findOne(query)
    .populate(population)
    .exec(function(err, user) {
      if(err) {
        return cb(err);
      }

      cb(null, user || {});
    });
};

exports.getCollection = function getCollection(query, qs, cb) {
 User
    .find(query, {}, qs)
    .populate(population)
    .exec(function(err, user) {
      if(err) {
        return cb(err);
      }
      
      cb(null, user || {});
    });

};