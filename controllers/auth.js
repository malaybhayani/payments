'use strict';
/**
 *
 * Load Module Dependencies.
 */
var EventEmitter = require('events').EventEmitter;
var crypto       = require('crypto');
var debug     = require('debug')('api:user-controller');
var async     = require('async');
var moment    = require('moment');
var validator = require('validator');
var _         = require('lodash');
var events    = require('events');
var bcrypt       = require('bcrypt');
var config      = require('../config');
var CustomError = require('../lib/custom-error');
const { isEmpty } = require('lodash');

function UnsetToken(req, res, next) {
  var current = new Date();
  var TBL = 'token';
  var Qry = 'SELECT * FROM '+TBL+' WHERE revoked = 1';
  var created;
  config.MySQL.query(Qry, function (err, chcktkn) {
    if(err) throw err;
    async.eachSeries(chcktkn, function(data, callback){
      //console.log(data.updated_at);
      
      if(data.updated_at == '') { created = data.created_at; }
      else{ created = data.updated_at;}
      var deleteID = data.id;
      //var diffDays = Math.round(Math.abs((current - created_at) / oneDay));
      console.log('created '+created);
      var dif = ( current - created);
      var dif = Math.round((dif/1000)/60);
      console.log('difference ' +dif);
      var show_tbl = "UPDATE "+TBL+" set revoked = ?, tokens = ? WHERE id = ?";
      var emptyOut = '';
      if(dif > 30){
        config.MySQL.query(show_tbl, [0, emptyOut, deleteID], function (err, result) {
          if(err) throw err;
          //console.log(result);
        });
      }
      else{}
      callback(null)     
    },function done(err){
      if (err) {
        return next(err);
      }else{
        //res.json(cats);
      }
    });
  });
}
setInterval(UnsetToken,1800000); //30MIN 1500000

function createToken() {
  debug('generate a token');

  var sha256 = crypto.createHash('sha256');
  var retry = 1;
  var randomBytes;

  try {
    randomBytes = crypto.randomBytes(config.TOKEN.RANDOM_BYTE_LENGTH).toString('hex');
    return tsha256.update(randomBytes).digest('base64');
  } catch(ex) {
    if(retry <= 5) {
      createToken();
    }
    throw ex;
  }
}


/**
 * Login a user
 *
 * @desc login a user using thei email and password.
 * Return profile and user data with an authentication token.
 */
//Login Controller
exports.login = function login(req, res, next) {
  var now = moment().toISOString();
  config.MySQL.connect(function (error) {
    //if(error) throw error;
    debug('Login User');
     var body = req.body;
     var tbl_name = 'admin';
     var tbl_tokn = 'token';
     req.checkBody('username')
        .notEmpty().withMessage(config.errorResponse.userNameEmpty).isEmail().withMessage(config.errorResponse.userNameEmail);
      req.checkBody('password')
      .notEmpty().withMessage(config.errorResponse.passwordEmpty)
      .len(6, 20).withMessage(config.errorResponse.passwordLength);
      config.MySQL.query('SELECT sn, email, password, active, role, permissions FROM '+tbl_name+' WHERE email = ?', [body.email], (error, results)=> {
        if(error) throw error;
          if (results.length > 0 ) {
            console.log(results[0].password);
            bcrypt.compare(body.password, results[0].password, function(err, isMatch){
              if(err) { return next(err); }
              if(!isMatch) { 
                res.status(400);
                res.json({
                  error: true, message: "Incorrect password or email please try AGAIN!", status: 400
                }); 
              } 
              else { //res.send("Successful"); 
                  var user_id = results[0].sn;
                  var check_tknUsrID = 'SELECT sn, tokens FROM '+tbl_tokn+' WHERE sn = ?';
                  config.MySQL.query(check_tknUsrID, [user_id], function (err, chckit) {
                    if(err) throw err; 
                    switch(chckit.length)
                    {
                      case 1:
                        crypto.randomBytes(config.TOKEN_LENGTH, function tokenGenerator(err, buff) {
                          if (err) {
                              return next(err);
                          }
                          body.updated_at = now;
                          var tokenValue = buff.toString('base64');
                          var Update_tokn = 'UPDATE '+tbl_tokn+' set tokens=?, updated_at=?, revoked=? WHERE sn = ?';
                          var intomeIsee = [tokenValue, now, 1, user_id];
                          config.MySQL.query(Update_tokn, intomeIsee,  function (err, chcktkn) {
                            if(err) throw err;
                            console.log('successfully updated');
                            //users = results.toJSON();
                            delete results[0].password;
                            res.json({ token: tokenValue, user: results });
                            req._user = results;
                            console.log(req._user[0].sn);
                          });
                        });
                        break;
                      case 0:
                        crypto.randomBytes(config.TOKEN_LENGTH, function tokenGenerator(err, buff) {
                          if (err) {
                              return next(err);
                          }
                          body.created_at = now;
                          var tokenValues = buff.toString('base64');
                          var insert_tokn = 'INSERT INTO '+tbl_tokn+' (sn, tokens, date_created, revoked) VALUES (?,?,?,?)';
                          config.MySQL.query(insert_tokn, [user_id, tokenValues, now, 1], function (err, instTkn) {
                            if(err) throw err;
                            console.log('successfully updated');
                            res.json({ token: tokenValues });
                          })
                        });
                        break;
                      default:
                        res.status(400);
                        res.json({
                          error: true,
                          message: err,
                          status: 400
                        });
                        break;
                    }
                  });
              }
            });
          }
          else{
            res.status(400).json({
              error: true,
              message: 'email id does not exist!',
              status: 400
            });
          }
      });
  });
};

exports.checkToken = function checkToken (req,res,next){
  var remove = req.headers.authorization;
  var auth = remove.slice(7);
  res.json(auth)
  console.log(req.headers.authorization)
}

/**
 * Log out a user.
 */
exports.logout = function logout(req, res, next) {
   var tbl_tokn = 'token';
    /*Select all customers with the address "Park Lane 38":*/
    var remove = req.headers.authorization;
    var auth = remove.slice(7);
    var emptyOut  = '';
    config.MySQL.query("UPDATE "+tbl_tokn+" set tokens=?, revoked=? WHERE tokens = ?", [emptyOut,0,auth],function (err, result) {
      if (err) throw err;
      if(result.changedRows > 0)
      {
        res.status(200);
        res.json({
          message: "successfully Logged out",
          status: 200
        });
      }
      else {
        res.status(400).json({error: true, message: "You are not logged out!", status: 400});
      }
    });
  
};

exports.accessControl = function accessControl(roles, action) {
  action = action || 'ALLOW';
  return function (req, res, next) {
    var user = req._user[0].sn;
    if(!user) {
      return next(CustomError({
        name: 'AUTHORIZATION_ERROR',
        message: 'Please Login or register to continue'
      }));
    }
    var tbt = 'admin';
    var check_tknUsrID = 'SELECT sn, role FROM '+tbt+' WHERE sn = ?';
    config.MySQL.query(check_tknUsrID, [req._user[0].sn], function (err, chckit) {
      if(err) throw err;
      var userRole  = chckit[0].role;
      console.log(chckit[0].role);
      var allowed   = false;
      roles = Array.isArray(roles) ? roles: [roles];
      roles.forEach(function(role) {
        switch(role) {
          case '*':
          case userRole:
            allowed = true;
            break;
        }
      });
      if(!allowed) {
        return next(CustomError({
          name: 'AUTHORIZATION_ERROR'
        }));
      } else {
        return next();
      }
    });
  };
};