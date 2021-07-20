// Load Module Dependencies
var events       = require('events');
var debug        = require('debug')('api-user');
var moment       = require('moment');
var bcrypt       = require('bcrypt');
var nodemailer   = require('nodemailer');
var EventEmitter = require('events').EventEmitter;
var crypto       = require('crypto');
var url = require('url');
var config          = require('../config');
var UserModel         = require('../models/user');
var UserDal         = require('../dal/user');
const { ECANCELED } = require('constants');
const { isEmpty, rest } = require('lodash');
// no operation(noop) function
exports.noop = function noop(req, res, next) {
  res.json({
    error:false,
    message: 'To be implemented!'
  });
};

exports.validateUser = function validateUser(req, res, next, id) {
  //Validate the id is mongoid or not
  req.checkParams('id', 'Invalid param');
  var validationErrors = req.validationErrors();
  if (validationErrors) {
    res.status(404).json({
      error: true,
      message: "Not Found",
      status: 404
    });
  } else {
    var tbl = 'admin';
    var show_tbl = "SELECT sn, email, password, permissions, role, active FROM "+tbl+" WHERE sn = ?";
    config.MySQL.query(show_tbl, [id], function (err, result) {
      if (err) throw err;
      if(result[0].sn)
      {
        req.doc = result[0];
        next();
      }
      else{
        console.log(result[0])
        res.status(404).json({
          error: true, status: 404,
          msg: 'admin sn ' + id + ' not found'
        });
      }
    });
  }
};

exports.getUserInfo = function(req, res, next){
  if(!req._user){
    res.status(401).json({"message":"Unauthorized user!"});
    return;
  }
  var tbl_name = 'admin';
  var YourQuery = 'SELECT sn, email, password, active, role, permissions FROM '+tbl_name+' WHERE sn = ?';
  config.MySQL.query(YourQuery, [req._user[0].sn], (error, results)=> {
    if(error) throw error;
    switch(results.length)
    {
      case 1:
        delete results[0].password;
        res.status(200).json(results);
        break;
      default:
        res.status(401).json({
          error: true, message: 'unauthorization detected!', status: 401
        });
        break;
    }
  });
}

exports.createUser = function createUser(req, res, next) {
  var now = moment().toISOString();
  var body = req.body;
    // debug('validate user');
    // Validate User Data
    req.checkBody('email', 'Email  should not be empty!').isEmail().withMessage("Username should be email").notEmpty();
    req.checkBody('password').notEmpty().withMessage('password should not be empty').len(6, 20).withMessage('6 to 20 characters required');
    req.checkBody('role').notEmpty().withMessage('Roles should not be Empty');
    var tbl = "admin"; console.log("Connected!");
        bcrypt.genSalt(16, function genSalt(err, salt) {
          if (err) {
            return next(err);
          }
          bcrypt.hash(body.password, salt, function hashPasswd(err, hash) {
            if (err) {
              return next(err);
            }
            var check_sql = 'SELECT email FROM '+tbl+' WHERE email = ?';
            config.MySQL.query(check_sql, [body.email], function (err, results) {
              if(err) throw err;
              console.log(results.length);
              switch(results.length)
              {
                case 1:
                  res.status(200);
                  res.json({
                    error: true,
                    message: "Email already exists"
                  });
                  break
                case 0:
                  var sql = "INSERT INTO "+tbl+" (email, password, role) VALUES (?,?,?)";
                  var Permitted = [body.email, hash, body.role];
                  config.MySQL.query(sql, Permitted, function (err, result) {
                    if (err) throw err;
                    var check_query = result.length;
                    console.log(check_query);
                    console.log(result);
                    switch(result.affectedRows){
                      case 1:
                        res.status(200);
                        res.json({
                          error: false,
                          status: 200,
                          message: 'successfully created',
                          data: result
                        });
                        break;
                      default:
                        res.status(400);
                        res.json({
                          error: true,
                          status: 400,
                          message: 'something went wrong'
                        });
                        break;
                    }
                  });
                  break;
                default:
              }
            });
          });
        });
};

exports.removeUser = function removeUser(req,res,next){
  console.log('delete');
  var sn = req.doc.sn;
  console.log('delete id =>' +sn)
  var tbl = 'admin';
  var show_tbl = 'DELETE FROM `'+tbl+'` WHERE `sn` = ?';
  config.MySQL.query(show_tbl, [sn], function (err, result) {
    if(err) throw err;
    switch(result.length)
    {
      case 1:
        res.status(200);
        res.json({
          error: false, message: "deleted succesfully", status: 200
        });
        break;
      case 0:
        res.status(400);
        res.json({
          error: true, message: "error occured", error_name: err, status: 400
        });
        break;
      default:
    }
  });
}

exports.allUsers = function allUsers(req,res,next){
  var tbl = 'admin';
  var show_tbl = 'SELECT sn, email, permissions, role, active FROM ' + tbl + '';
  config.MySQL.connect(function (err) {
    config.MySQL.query(show_tbl, function (err, result) {
      if (err) throw err;
      switch (result.length) {
        case 0:
          console.log('there is no user');
          res.status(200);
          res.json({
            error: false,
            message: "there are no data",
            status: 200
          })
          break;
        default:
          console.log('there is a usr');
          res.status(200);
          res.json(result);
      }
    });
  });
}
exports.getUser = function getUser(req, res, next) {
  var sn = req.doc.sn;
  var tbl = 'admin';
  var show_tbl = 'SELECT sn, email, password, permissions, active, role FROM ' + tbl + ' WHERE sn = ' + sn + '';
  config.MySQL.query(show_tbl, function (err, result) {
    if (err) throw err;
    switch (result.length) {
      case 0:
        console.log('there is no user');
        res.status(200);
        res.json({
          error: false,
           message: "there are no data",
          status: 200
        })
        break;
      default:
          console.log('Fucking user');
          res.status(200);
          delete result[0].password;
          res.json(result);
    }
  });
};



exports.updateUser = function updateUser(req, res, next) {
  var body = req.body;
  
  var tbl = 'admin';
  var sn = req.doc.sn;
  var show_tbl = "UPDATE "+tbl+" set email = ?, permissions = ?, role = ?, active =? WHERE sn = ?";
  config.MySQL.query(show_tbl, [body.email, body.permissions, body.role, body.active, sn], function (err, result) {
    if (err) throw err;
    switch (result.length) {
      case 0:
        console.log('there is no user');
        res.status(200);
        res.json({
          error: false,
           message: "there are no data",
          status: 200
        })
        break;
      default:
          console.log('there is a usr');
          res.status(200);
          delete result.password;
          res.json(result);
    }
  });
};

exports.deleteUser = function deleteUser(req, res, next) {
  var body = req.body;

  UserDal.delete({ _id: req.body._id }, function deleteUser(err, doc) {
    if (err) {
      return next(err);
    }
    res.json(doc);
  });
};

exports.getUsers = function getUsers(req, res, next) {
  var options={password:0};
  // Retrieve all the Users
  UserDal.getCollection({},options, function getAllUsers(err, docs) {
    if (err) {
      return next(err);
    }
  
    res.json(docs);
  });
};

exports.passwordChange = function passwordChange(req, res, next) {
  var body = req.body;
  var now = moment().toISOString();

  var workflow = new events.EventEmitter();

  workflow.on('validateInput', function validateInput() {
    // req.checkBody('username', "Invalid User Name")
    //   .notEmpty();
    req.checkBody('old_password', "Invalid old_password")
      .notEmpty();
    req.checkBody('new_password', "Invalid new_password")
      .notEmpty();

    var validationErrors = req.validationErrors();
    if (validationErrors) {
      res.json(validationErrors);
    } else {
      workflow.emit('validateUsername')
    }
  });

  workflow.on('validateUsername', function validateUsername() {
  
    UserModel.findOne({ username: req._user.username}, function getUser(err, user) {
      if (err) {
        return next(err);
      }

      if(!user._id){
        res.status(404);
        res.json({error:true,msg:"user is not found",status:404});
        return;
      }
      else{
         workflow.emit('checkPassword', user);
      }
    });
  });
  workflow.on('checkPassword', function checkPassword(user) {
    user.checkPassword(body.old_password, function check(err, isOk) {
      if (err) {
        return next(err);
      }
      if (!isOk) {
       res.status(403);
      console.log(body.old_password);
        res.json({
          error:true,
           message: "Wrong old password",
           status:403
          });
        return;
      }
      else {
        workflow.emit('changePassword', user);
      }

    });
  });
  workflow.on('changePassword', function passwordChange(user) {
    bcrypt.genSalt(config.SALT_LENGTH, function genSalt(err, salt) {
      if (err) {
        return next(err);
      }
      bcrypt.hash(body.new_password, salt, function hashPasswd(err, hash) {
        if (err) {
          return next(err);
        }

        var now = moment().toISOString();
        var tbl = 'admin';
        var sql = "UPDATE "+tbl+" set password = ? WHERE sn = ?";
        config.MySQL.query(sql, [hash, req._user[0].sn], function (err, result) {
          if (err) throw err;
          var check_query = result.length;
          if(check_query == 1){ console.log('Moodle password also updated :)'); }
          if(check_query == 0){ console.log('Moodle password not updated :('); }
        });
      });// end of update
    });// end of hash
  });// end of gensalt

  workflow.on('respond', function respond() {
    res.json({ 
      error:false,
      message: "Sucessfully changed.",
      status:200
     })
  });
  workflow.emit('validateInput');

};

exports.sendEmail1 = function sendEmail1(req,res,next){
  var sn = 1;
  var tbl = 'admin';
  var show_tbl = 'SELECT sn, email, permissions, active, role FROM ' + tbl + ' WHERE active = ' + sn + '';
  config.MySQL.query(show_tbl, function (err, result) {
    if (err) throw err;
    switch (result.length) {
      case 0:
        console.log('there is no user');
        res.status(200);
        res.json({
          error: false,
           message: "there are no data",
          status: 200
        })
        break;
      default:
          console.log('there is a usr');
          res.status(200);
          res.json(result);
    }
  });
};

exports.resetPhonePass = function resetPhonePass(req, res, next){
  var remove = req.headers.authorization;
  var auth = remove.slice(7);
  var tbl_tokn = 'token';
  var tbl_admn = 'admin';
  var QRY_TBL = 'SELECT * FROM '+tbl_tokn+' WHERE tokens = ? AND revoked = 3';
  var UPD_TBL = "UPDATE "+tbl_admn+" set password=? WHERE sn = ?";
  config.MySQL.query(QRY_TBL, [auth], function (err, results) {
    if(err) throw err;
    switch(results.length)
    {
      case 0:
        res.status(404).json({
          error: true, message: 'RESET REQUEST DENIED!', status: 404
        });
        break;
      default:
        var body = req.body;
        var now = moment().toISOString();
        req.checkBody('new_password')
            .notEmpty().withMessage('new password should not be empty')
            .len(6, 20).withMessage('6 to 20 characters required');
        req.checkBody('confirmed_password')
            .notEmpty().withMessage('confirm password should not be empty')
            .len(6, 20).withMessage('6 to 20 characters required');

        if(body.new_password != body.confirmed_password)
        {
          res.status(400);
          res.json({
            error: true,
            msg: 'Password does not match please try again',
            status: 400
          });
        }
        else if(body.new_password == body.confirmed_password)
        {
          bcrypt.genSalt(16, function genSalt(err, salt) {
            if (err) {
              return next(err);
            }
            bcrypt.hash(body.new_password, salt, function hashPasswd(err, hash) {
                if (err) {
                  return next(err);
                }
              config.MySQL.query(UPD_TBL, [hash, results[0].sn], function (err, results) {
                if(err) throw err;
                switch(results.changedRows)
                {
                  case 0:
                    res.status(400).json({
                      error: true,
                      message: 'Password did not update',
                      status: 400
                    });
                    break;
                  default:
                    var Update_tokn = 'UPDATE '+tbl_tokn+' set tokens=?, updated_at=?, revoked=? WHERE tokens = ?';
                    var tokenValue = '';
                    var intomeIsee = [tokenValue, now, 0, auth];
                    config.MySQL.query(Update_tokn, intomeIsee,  function (err, chcktkn) {
                      if(err) throw err;
                      switch(chcktkn.changedRows)
                      {
                        case 0:
                          console.log('did not update');
                          res.status(400).json({
                            error: true, message: 'ERROR occured please try again!', status: 400
                          })
                          break;
                        default:
                          res.status(200).json({ message: 'Succssfully Changed Password!', status: 200 });
                      }
                    });
                }
              });
            });
          });
        }
        break;
    }
  });
  
};

exports.forgotPassword = function forgotPassword(req,res,next){
  var body = req.body;
  //var reset_link_address = config.PASSWORD_RESET.RESET_LINK_ADDRESS;
  var reset_link_address = 'https://URL_ADDRESS/reset';
  var tbl_tokn = 'token';
  // token_expires.setDate(now.getDate()+settings.RESET_TOKEN_EXPIRY);
  req.checkBody('email').notEmpty().withMessage('Email should not be Empty').isEmail().withMessage('Should be valid email');
    var tbl_name = 'admin';
    var EmailQuery = 'SELECT sn, email, password, active, role, permissions FROM '+tbl_name+' WHERE email = ?';
    config.MySQL.query(EmailQuery, [body.email], (error, usr)=> {
        if (error) {
          return next(error);
        }
        switch(Object.keys(usr).length) {
          case 0:
            res.status(404);
            res.json({
              error: true,
              msg: "Email is not registered",
              status: 404
            });
            break;
          case 1:
            ////Let's create the reset token
            crypto.randomBytes(16, function genToken(err, buff){
              if (err) {
                return next(err);
              }
              var user_id = usr[0].sn;
              var reset_token = buff.toString('hex');
              var token_expires = Date.now() + 3600000 //1hr
              var checkTokenHist = 'SELECT * FROM '+tbl_tokn+' WHERE sn = ?';
              var Param = [user_id];
              config.MySQL.query(checkTokenHist, Param, (err, users)=> {
                if(err) throw err;
                if(users.length > 0)
                {
                  switch(users[0].revoked)
                  {
                    case 3:
                      res.status(400).json({
                        erro: true, message: "You have already requested for your password to be retrieved", status: 400
                      });
                      break;
                    default:
                      var Update_tokn = 'UPDATE '+tbl_tokn+' set tokens=?, updated_at=?, revoked=? WHERE sn = ?';
                      var intomeIsee = [reset_token, token_expires, 3, user_id];
                      config.MySQL.query(Update_tokn, intomeIsee,  function (err, chcktkn) {
                        if(err) throw err;
                        switch(chcktkn.changedRows)
                        {
                          case 0:
                            res.status(400).json({
                              error: true, message: 'an error occured email was not sent for reset', status: 400
                            });
                            break;
                          default:
                            var transporter = nodemailer.createTransport({
                              host: config.EHOST,
                              secureConnection: false,
                              port: config.EPORT,
                              tls: {
                                ciphers:'SSLv3'
                              },
                              auth: {
                                user: config.GUSER, //sender email address
                                pass: config.GPASS //sender email password
                              }
                            });
                            // setup email data with unicode symbols
                            let mailOptions = {
                              from: config.GUSER,//sender email address
                              to: body.email, // reciever
                              subject: 'Reset Request for forgotten password',
                              html: '<h3>password recovery </h3>' + 
                                    '<p> please click on (or copy and paste) the link below to reset your password</p>'+
                                            reset_link_address + '?email=' + body.email + '&token='+reset_token+
                                    '<p> you recieved this email because you requested to reset your forgotten password!</p>'+
                                    '<p>If you have not sent this you can just ignore this and continue with your current password! Thank you! </p>'
                            };
                            transporter.sendMail(mailOptions, function (error, info) {
                              if (error) {
                                res.json(error);
                              } else {
                                res.status(200);
                                res.json({ error: false, msg: "SUCESSFULLY SENT", status: 200 });
                              }
                            });
                        } 
                      });
                  }
                }
                else{
                  //insert query
                  var insert_tokn = 'INSERT INTO '+tbl_tokn+' (sn, tokens, updated_at, date_created, revoked) VALUES (?,?,?,?,?)';
                  config.MySQL.query(insert_tokn, [user_id, reset_token, token_expires, Date.now(), 3], function (err, instTkn) {
                    if(err) throw err;
                    switch(instTkn.affectedRows)
                    {
                      case 0:
                        res.status(400).json({
                          erro: true,
                          message: "An error Occured Email was not sent",
                          status: 400
                        });
                        break;
                      default:
                        var transporter = nodemailer.createTransport({
                          host: config.EHOST,
                          secureConnection: false,
                          port: config.EPORT,
                          tls: {
                            ciphers:'SSLv3'
                          },
                          auth: {
                            user: config.GUSER, //sender email address
                            pass: config.GPASS //sender email password
                          }
                        });
                        // setup email data with unicode symbols
                        let mailOptions = {
                          from: config.GUSER,//sender email address
                          to: body.email, // reciever
                          subject: 'Reset Request for forgotten password',
                          html: '<h3>password recovery </h3>' + 
                                '<p> please click on (or copy and paste) the link below to reset your password</p>'+
                                reset_link_address + '?email=' + body.email + '&token='+reset_token+
                                '<p> you recieved this email because you requested to reset your forgotten password!</p>'+
                                '<p>If you have not sent this you can just ignore this and continue with your current password! Thank you! </p>'
                        };
                        transporter.sendMail(mailOptions, function (error, info) {
                          if (error) {
                            res.json(error);
                          } else {
                            res.status(200);
                            res.json({ error: false, msg: "SUCESSFULLY SENT", status: 200 });
                          }
                        });
                        break;
                    }
                  });
                }
              }); 
            });
            break;
          default:
        }
    });
  };