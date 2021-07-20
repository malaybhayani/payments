var moment  = require('moment');
var _       = require('lodash');

var Token       = require('../models/token');
var mongoUpdate = require('../lib/mongo-update');

var returnFields = Token.whitelist;
var population = [{
  path: 'user',
  select:"-password"
}];

exports.create = function create(tokenData, cb) {
  var query;

  query = { user: tokenData.user };

  // Make sure token does not exist
  Token.findOne(query, function tokenExists(err, isPresent) {
    if(err) {
      return cb(err);
    }

    if(isPresent) {
      exports.get({ _id: isPresent._id }, function(err, token) {
        if(err) {
          return cb(err);
        }
        cb(null, token);
      });
      return;
    }

    // Create token if is new.
    var tokenModel  = new Token(tokenData);

    tokenModel.save(function saveToken(err, data) {
      if (err) {
        return cb(err);
      }

      exports.get({ _id: data._id }, function(err, token) {
        if(err) {
          return cb(err);
        }
        cb(null, data);
      });

    });
  });
};

exports.delete = function deleteItem(query, cb) {
  Token
    .findOne(query, opts)
    .populate(population)
    .exec(function deleteToken(err, token) {
      if (err) {
        return cb(err);
      }

      if(!token) {
        return cb(null, {});
      }

      token.remove(function(err) {
        if(err) { return cb(err); }
        cb(null, token);
      });

  });
};

exports.update = function update(query, updates,  cb) {
  var now = moment().toISOString();
  var opts = {
    'new': true,
    select: returnFields
  };

  updates = mongoUpdate(updates);

  Token
    .findOneAndUpdate(query, updates, opts)
    .populate(population)
    .exec(function updateToken(err, token) {
      if(err) {
        return cb(err);
      }

      cb(null, token || {});
    });
};

exports.get = function get(query, cb) {
  Token
    .findOne(query, returnFields)
    .populate(population)
    .exec(function getToken(err, token) {
      if(err) {
        return cb(err);
      }

      cb(null, token || {});

  });
};

exports.getCollection = function getCollection(query, qs, cb) {
  cb(null,
     Token
      .find(query, returnFields)
      .populate(population)
      .stream({ transform: JSON.stringify }));

};