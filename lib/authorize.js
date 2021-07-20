/**
 * Load Module Dependencies
 */
var debug  = require('debug')('api:authorization');
var _      = require('lodash');
var unless = require('express-unless');

var config      = require('../config');
var CustomError = require('./custom-error');
// var Token       = require('../dal/token');
// var UserDal       = require('../dal/user');


module.exports = function authorizeAccess(opts) {
  var options = {};

  opts = opts || {};

  _.extend(options, opts);

  function middleware (req, res, next) {
    // UserDal.get({ first_name: 'admin' }, function (err, doc) {
    //   req.user = doc;
    //   next();
    // });
    
   
    var accessToken;

    if (req.headers && req.headers.authorization) {
      var parts = req.headers.authorization.split(' ');
      if (parts.length == 2) {
        var scheme = parts[0];
        var credentials = parts[1];
        if (/^Bearer$/i.test(scheme)) {


          accessToken = credentials;
        } else {
          return next(CustomError({
            name: 'CREDENTIALS_SCHEME_ERROR',
            message: 'Format is Authorization: Bearer [token]'
          }));
        }
      } else {
        return next(CustomError({
          name: 'CREDENTIALS_FORMAT_ERROR',
          message: 'Format is Authorization: Bearer [token]'
        }));
      }

    } else if (req.query && req.query['access-token']) {
      accessToken = req.query['access-token'];
    }

    if (!accessToken) {
      return next(CustomError({
        name: 'CREDENTIALS_REQUIREMENT_ERROR',
        message: 'No authorization token was found'
      }));
    }
    // console.log(accessToken);
    var checkToken = "SELECT * FROM token WHERE revoked = 1 AND tokens = ?";
    config.MySQL.query(checkToken, [accessToken], function (err, results) {
      if(err) throw err;
      if(results.length === 0)
      {
        return next(CustomError({
          name: 'CREDENTIALS_REQUIREMENT_ERROR',
          message: 'Access Token provided is invalid'
        }));
      }
      else if(results.length !== 0)
      {
        
        if(results[0].sn !== 0)
        {
          var tbt = 'admin';
          var check_tknUsrID = 'SELECT sn FROM '+tbt+' WHERE sn = ?';
          config.MySQL.query(check_tknUsrID, [results[0].sn], function (err, chckit) {
            if(err) throw err; 

            req._user = chckit;
            req._user[0].sn = results[0].sn || null;
            next();
          });
        }
        if(results[0].user_customers !== 0)
        {
          var tbt_usr = 'users';
          var check_tknUsrID = 'SELECT sn FROM '+tbt_usr+' WHERE sn = ?';
          config.MySQL.query(check_tknUsrID, [results[0].user_customers], function (err, chckCust) {
            if(err) throw err; 

            req._user = chckCust;
            req._user[0].user_customers = results[0].user_customers || null;
            next();
          });
        }
        
      }
    });
  }
  middleware.unless = unless;

  return middleware;
};
