// Load Module Dependencies
var events       = require('events');
var crypto       = require('crypto');
var debug     = require('debug')('api:user-controller');
var moment       = require('moment');       // date and time displayer
var config      = require('../config');
var async = require('async');
var bcrypt       = require('bcrypt');
const _ = require("lodash");
var fs = require('fs');
const { isEmpty, rest } = require('lodash');
var CustomError = require('../lib/custom-error');
// no operation(noop) function
exports.noop = function noop(req, res, next) {
  res.json({
    error:false,
    message: 'To be implemented!'
  });
};

exports.validatebank = function validatebank(req, res, next, id) {
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
    var tbl = 'users';
    var show_tbl = "SELECT sn, type, mobile, name, email, password, wallet, kyc, country, country_code, token, wallet_limit, active, created_at FROM "+tbl+" WHERE sn = ?";
    config.MySQL.query(show_tbl, [id], function (err, result) {
      if (err) throw err;
      console.log(result[0]);
      if(result[0])
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

exports.create = function create(req, res, next) {
    var body = req.body;
    var date = new Date();
    var nowSeconds = date.getTime() / 1000; //1440516958
    var now = moment().toISOString();
    req.checkBody('type').notEmpty().withMessage('Customer Type must not be empty');
    req.checkBody('mobile').notEmpty().withMessage('Mobile should not be empty');
    req.checkBody('name').notEmpty().withMessage('Name should not be empty');
    req.checkBody('email', 'Email  should not be empty!').isEmail().withMessage("Username should be email").notEmpty();
    req.checkBody('password').notEmpty().withMessage('Password should not be empty');
    // req.checkBody('wallet').notEmpty().withMessage('wallet should not be empty');
    // req.checkBody('country').notEmpty().withMessage('wallet should not be empty');
    req.checkBody('country_code').notEmpty().withMessage('Country Code should not be empty');
    var validationErrors = req.validationErrors();
    if (validationErrors) {
      res.status(400);
      res.json(validationErrors);
      return;
    }
    var tbl = 'users';
    var tbl_sub = 'users_kyc';
    var show_tbl = "SELECT type, sn, mobile, name, email, password, wallet, kyc, country, country_code, token, wallet_limit, active, created_at FROM "+tbl+" WHERE email = ? OR mobile = ?";
    
    config.MySQL.query(show_tbl, [body.email, body.mobile], function (err, result) {
      if(err) throw err;
      switch(result.length)
      {
        case 1:
          res.status(400).json({
            error: true, message: "Email or Phone number already exist", status: 400
          });
        case 0:
          // nice so nothing time to create an account
          bcrypt.genSalt(16, function genSalt(err, salt) {
            if (err) {
              return next(err);
            }
            bcrypt.hash(body.password, salt, function hashPasswd(err, hash) {
              if (err) {
                return next(err);
              }
              var Int_QRY = 'INSERT INTO '+tbl+' (type, mobile, name, email, password, country_code, created_at) VALUES (?,?,?,?,?,?,?)';
              const Param = [body.type, body.mobile, body.name, body.email, hash, body.country_code, nowSeconds];
              config.MySQL.query(Int_QRY, Param, function (error, results) {
                if(error) throw error;
                switch(results.affectedRows)
                {
                  case 0:
                    res.status(400).json({
                      error: true, message: "Error occured user is not saved into the database", status: 201
                    });
                    break;
                  case 1:
                    /** something */
                    var lastRecord = results.insertId;
                    if (!req.files[0]) {
                      res.status(400);
                      res.json({
                        msg: "Please upload three file from front_side, back_side and a selfie"
                      });
                      return;
                    }else{
                      let dest1 = 'uploads/' + req.files[0].filename;
                      let dest2 = 'uploads/' + req.files[1].filename;
                      let dest3 = 'uploads/' + req.files[2].filename;
                      body.front_side = dest1;
                      body.back_side = dest2;
                      body.selfie = dest3;
                      var sub_tbl = "INSERT INTO "+tbl_sub+" (user_id, document_type, front_side, back_side, selfie) VALUES (?,?,?,?,?)";
                      var Parameter = [lastRecord, body.document_type, body.front_side, body.back_side, body.selfie];
                      config.MySQL.query(sub_tbl, Parameter, function (err, doc_upl) {
                        if(err) throw err;
                        switch(doc_upl.length)
                        {
                          case 0:
                            res.status(400).json({
                              error: true, message: "Something went wrong in the database", status: 400
                            });
                            break;
                          default:
                            switch(doc_upl.affectedRows)
                            {
                              case 0:
                                res.status(400).json({
                                  error: true, message: "No data has been pushed into the database", status: 400
                                })
                                break;
                              default:
                                res.status(201).json({
                                  message: "User successfully created", status: 201
                                });
                            }
                        }
                      });
                    }
                    break;
                  default:
                }
              });
            });
          });
      }
    });
    
};


exports.authenticateUser = function authenticateUser(req,res,next){
  var body = req.body;
  var now = moment().toISOString();
  //config.MySQL.connect(function (error) {
    //if(error) throw error;
    debug('Login User');
     var tbl_name = 'users';
     var tbl_tokn = 'token';
      if(isEmpty(body.email))
      {
        var CheckUserQry = 'SELECT sn, type, mobile, email, password, wallet, kyc, country, country_code, wallet_limit, active, settlement FROM '+tbl_name+' WHERE mobile = ?';
        req.checkBody('mobile').notEmpty().withMessage('Please enter mobile number');
        body.email = ''; var USPARAM = [body.mobile];
      }
      else{
        var CheckUserQry = 'SELECT sn, type, mobile, email, password, wallet, kyc, country, country_code, wallet_limit, active, settlement FROM '+tbl_name+' WHERE email = ?';
        req.checkBody('email')
        .notEmpty().withMessage(config.errorResponse.userNameEmpty).isEmail().withMessage(config.errorResponse.userNameEmail);
        body.mobile = ''; var USPARAM = [body.email];
      }

      if(isEmpty(body.mobile)){
        var CheckUserQry = 'SELECT sn, type, mobile, email, password, wallet, kyc, country, country_code, wallet_limit, active, settlement FROM '+tbl_name+' WHERE email = ?';
        req.checkBody('email')
        .notEmpty().withMessage(config.errorResponse.userNameEmpty).isEmail().withMessage(config.errorResponse.userNameEmail);
        body.mobile = '';
        var USPARAM = [body.email];
      }
      else{
        var CheckUserQry = 'SELECT sn, type, mobile, email, password, wallet, kyc, country, country_code, wallet_limit, active, settlement FROM '+tbl_name+' WHERE mobile = ?';
        req.checkBody('mobile').notEmpty().withMessage('Please enter mobile number');
        body.email = '';
        var USPARAM = [body.mobile];
      }
     
      req.checkBody('password')
      .notEmpty().withMessage(config.errorResponse.passwordEmpty)
      .len(6, 20).withMessage(config.errorResponse.passwordLength);
      config.MySQL.query(CheckUserQry, USPARAM, (err, results) => {
        if(err) throw err;
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
                  var check_tknUsrID = 'SELECT user_customers, tokens FROM '+tbl_tokn+' WHERE user_customers = ?';
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
                          var Update_tokn = 'UPDATE '+tbl_tokn+' set tokens=?, updated_at=?, revoked=? WHERE user_customers = ?';
                          var Param = [tokenValue, now, 1, user_id];
                          config.MySQL.query(Update_tokn, Param,  function (err, chcktkn) {
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
                          var insert_tokn = 'INSERT INTO '+tbl_tokn+' (user_customers, tokens, date_created, revoked) VALUES (?,?,?,?)';
                          config.MySQL.query(insert_tokn, [user_id, tokenValues, now, 1], function (err, instTkn) {
                            if(err) throw err;
                            console.log('successfully updated');
                            res.json({ token: tokenValues, user: results  });
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
              message: "This UserID does not exist!",
              status: 400
            });
          }
      });
  //});
};

exports.docUpdate = function docUpdate(req,res,next){
  var body = req.body;
  const You = req._user[0].sn;
  console.log(You); 
  var tbl_name = 'users'; var tbl_sub = 'users_kyc';
  var Tbl = 'SELECT sn, mobile, name, email, password, wallet, kyc, country, country_code, token, wallet_limit, active, created_at FROM '+tbl_name+' WHERE sn = ?';
  var Param = [You];
  config.MySQL.query(Tbl, Param, function (err, result) {
    if(err){
      switch(result.length)
      {
        case 0:
          res.status(200).json({
            error: false, message: 'There is no user', status: 200
          });
          break;
        default:
          if (!req.files[0]) {
            res.status(400);
            res.json({
              msg: "Please upload three file from front_side, back_side and a selfie"
            });
            return;
          }else{
            let dest1 = 'uploads/' + req.files[0].filename;
            let dest2 = 'uploads/' + req.files[1].filename;
            let dest3 = 'uploads/' + req.files[2].filename;
            body.front_side = dest1;
            body.back_side = dest2;
            body.selfie = dest3;
            var sub_tbl = "INSERT INTO "+tbl_sub+" (user_id, document_type, front_side, back_side, selfie) VALUES (?,?,?,?,?)";
            var Parameter = [You, body.document_type, body.front_side, body.back_side, body.selfie];
            config.MySQL.query(sub_tbl, Parameter, function (err, results) {
              if(err) throw err;
              switch(result.affectedRows){
                case 1:
                  res.status(201).json({
                    message:"Congratulations! You have successfully updated your Profile", status: 201
                  });
                  break;
                case 0:
                  res.status(400).json({
                    error: true, message: "Error Occured! Please Try Again!", status: 400
                  });
                default:
                  res.status(201).json({
                    error: false, message: "updated!", status: 201
                  })
              }
            });
          }  
          break;
      }
    }
  });
}

exports.fetchOne= function fetchOne(req, res, next){
  var tbl = 'users'; var tbl_sub = 'users_kyc';
  var show_tbl = "SELECT sn, mobile, name, email, password, wallet, kyc, country, country_code, token, wallet_limit, active, created_at FROM "+tbl+" WHERE sn = ?";
  var sub_tbl = "SELECT sn, user_id, document_type, front_side, back_side, selfie FROM "+tbl_sub+" WHERE user_id = ?";
  config.MySQL.query(show_tbl, [req.doc.sn], function (err, result) {
    if(err) throw err;
    switch(result.length)
    {
      case 1:
        delete req.doc.password;
        config.MySQL.query(sub_tbl, [req.doc.sn], function (err, results) {
          if(err) throw err;
          switch(results.length)
          {
            case 0:
              res.status(200).json({info: req.doc});
              break;
            default:
              res.status(200).json({ info: req.doc, uploaded_doc: results });
              // res.status(200).json({ 
              //   sn: req.doc.sn,
              //   name: req.doc.name,
              //   mobile: req.doc.mobile,
              //   email: req.doc.email,
              //   wallet: req.doc.wallet,
              //   Uploaded_file: results,
              //   country: req.doc.country,
              //   code: req.doc.country_code,
              //   walletLimit: req.doc.wallet_limit,
              //   account_status: req.doc.active,
              //   created_at: req.doc.created_at
              // });
          } 
        });
        break;
      case 0:
        res.status(404).json({
          error: true, message: "User profile does not exist", status: 404
        });
        break;
      default:
    }
  });
};

exports.getTransaction = function getTransaction(req, res, next){
  var tbl = 'users'; var tbl_sub = 'transaction_history';
  var show_tbl = "SELECT sn, mobile, name, email, password, wallet, kyc, country, country_code, token, wallet_limit, active, created_at FROM "+tbl+" WHERE sn = ?";
  var trans_tbl = "SELECT user_id, amount, type, extra_info, created_at FROM "+tbl_sub+" WHERE user_id = ?";
  config.MySQL.query(show_tbl, [req._user[0].user_customers], function (err, result) {
    if(err) throw err;
    switch(result.length)
    {
      case 1:
        config.MySQL.query(trans_tbl, [result[0].sn], function (err, trans_result) {
          if(err) throw err;
          switch(trans_result.length)
          {
            case 0:
              res.status(200).json({
                message: "You don't have a transaction history", stauts: 200
              });
              break;
            default:
              var totalPayment = 0;
              trans_result.forEach(function (values, key) {
                totalPayment += values.amount;
              });
              res.status(200).json({data: trans_result, Total: thousands_separators(totalPayment)})
          }
        });
    }
  });
  function thousands_separators(num)
	{
	  var num_parts = num.toString().split(".");
		num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	  return num_parts.join(".");
	}
};

exports.profileCustomer = function profileCustomer(req,res,next){
  var id_cust = req._user[0].user_customers;
  var tbl = 'users'; var tbl_kyc = 'users_kyc';
  var show_tbl = "SELECT sn, mobile, name, email, password, wallet, kyc, country, country_code, token, wallet_limit, active, created_at FROM `"+tbl+"` WHERE sn = ?";
  var show_file = "SELECT sn, user_id, document_type, front_side, back_side, selfie FROM `"+tbl_kyc+"` WHERE user_id = ?";
  config.MySQL.query(show_tbl, [id_cust], function (err, result) {
    if(err) throw err;
    if(Object.keys(result).length > 0)
    {
      config.MySQL.query(show_file, [id_cust], function (err, results) {
        if(err) throw err;
        delete result[0].password;
        if(Object.keys(results).length > 0){ res.status(200).json({info: result, documents:results}); }
        else { res.status(200).json(result); }
      });
    }
    else{
      res.status(401).json({
        error: true, message: "Unauthorized user!", status: 401
      });
    }
  });
}

//607056bea1ecf7da36512afb
exports.fetchAll= function fetchAll(req,res,next){
  var tbl = 'users'; var tbl_sub = 'users_kyc';
  var show_tbl = "SELECT sn, mobile, name, email, password, wallet, kyc, country, country_code, token, wallet_limit, active, created_at FROM `"+tbl+"`";
  var sub_tbl = "SELECT sn, user_id, document_type, front_side, back_side, selfie FROM "+tbl_sub+" WHERE user_id = ?";
  config.MySQL.query(show_tbl, function (err, result) {
    if(err) throw err;
    switch(result.length)
    {
      case 1:
        res.status(404).json({
          error: false, message: "User profile does not exist", status: 404
        });
        break;
      default:
        var i; var arr;
        for(i=0;i<result.length;i++)
        {
          arr = result[i].sn;
          delete result[i].password;
        }
        config.MySQL.query(sub_tbl, [arr], function (err, results) {
          if(err) throw err;
            switch(results.length)
            {
              case 0:
                console.log('what the hell')
                res.status(200).json(result)
                break;
              default:
                res.status(200).json({ result, data: results });
            }
        });
    }
  });
};

exports.updateProfile = function updateProfile(req,res,next){
  var body = req.body;
  var sn = req._user[0].user_customers;
  var tbl = 'users';
  var show_tbl = "UPDATE "+tbl+" set mobile = ?, name = ?, country = ?, country_code =? WHERE sn = ?";
  config.MySQL.query(show_tbl, [body.mobile, body.name, body.country, body.country_code, sn], function (err, result) {
    if(err) throw err;
    if(result.changedRows > 0)
    {
      res.status(201).json({
        message: 'Successfully Updated', status: 201
      })
    }
    else{
      res.status(400).json({
        error: true, message: "No change was made on your update query", status: 400
      })
    }
  });
}

exports.updatePassword = function updatePassword(req,res,next){
  var body = req.body;
  var id = req._user[0].user_customers;
  req.checkBody('password').notEmpty().withMessage(config.errorResponse.passwordEmpty).len(6, 20).withMessage(config.errorResponse.passwordLength);
  req.checkBody('newPassword').notEmpty().withMessage(config.errorResponse.passwordEmpty).len(6, 20).withMessage(config.errorResponse.passwordLength);
  req.checkBody('confirm').notEmpty().withMessage(config.errorResponse.passwordEmpty).len(6, 20).withMessage(config.errorResponse.passwordLength);
      config.MySQL.query('SELECT sn, type, mobile, email, password, wallet, kyc, country, country_code, wallet_limit, active, settlement FROM '+tbl_name+' WHERE sn = ?', [id], (err, results)=> {
        if(err) throw err;
          if (results.length > 0 ) {
            console.log(results[0].password);
            bcrypt.compare(body.password, results[0].password, function(err, isMatch){
              if(err) { return next(err); }
              if(!isMatch) {
                res.status(400);
                res.json({
                  error: true, message: "Incorrect password! Please Try Again", status: 400
                }); 
              }
              if(body.newPassword == body.confirm)
              {
                bcrypt.genSalt(16, function genSalt(err, salt) {
                  if (err) {
                    return next(err);
                  }
                  bcrypt.hash(body.newPassword, salt, function hashPasswd(err, hash) {
                    if (err) {
                      return next(err);
                    }
                    var tbl = 'users'
                    var show_tbl = "UPDATE "+tbl+" set password = ? WHERE sn = ?";
                    config.MySQL.query(show_tbl, [hash, id], function (err, result) {
                      if(err) throw err;
                      if(result.changedRows > 0)
                      {
                        res.status(201).json({
                          message: 'You have sucessfully updated your password',
                          status: 201
                        })
                      }
                      else{
                        res.status(200).json({
                          error: true, message: "There is no change occurred on your databasae", status: 200
                        })
                      }
                    });
                  });
                });
              }
              else{
                res.status(400).json({error: true, message: 'You new Password and confirmed password does not match please try again', status: 400})
              }
            })
          }
        });
}

exports.update = function update(req, res, next){
    var body = req.body;
    var sn = req.doc.sn;
    var tbl = 'users';
    var show_tbl = "UPDATE "+tbl+" set mobile = ?, name = ?, country = ?, country_code =? WHERE sn = ?";
    config.MySQL.query(show_tbl, [body.mobile, body.name, body.country, body.country_code, sn], function (err, result) {
      if(err) throw err;
      if(result.changedRows > 0)
      {
        res.status(201).json({
          message: 'Successfully Updated', status: 201
        })
      }
      else{
        res.status(400).json({
          error: true, message: "No change was made on your update query", status: 400
        })
      }
    });
};

exports.deletebank = (req, res, next) => {
  var tbl = 'users'; var usr_kfc = 'users_kyc';
  var del_tbl = "DELETE FROM `"+tbl+"` WHERE `sn` = ?";
  var del_kfc = "DELETE FROM `"+usr_kfc+"` WHERE `sn` = ?";
  var show_tbl = "SELECT * FROM `"+usr_kfc+"` WHERE `sn` = ?";
  config.MySQL.query(del_tbl, [req.doc.sn], function (err, result) {
    if(err) throw err;
    switch(result.affectedRows)
    {
      case 1:
        config.MySQL.query(show_tbl, [req.doc.sn], function (err, showRslts) {
          if(err) throw err;
          console.log(showRslts);
          // start removing
          if (showRslts[0].front_side) {
            removePicture(showRslts[0].front_side, function () {
              //updatehelper(req._user._id, null, res, next);
            });
          }
          if (showRslts[0].back_side) {
            removePicture(showRslts[0].back_side, function () {
            
            });
          }
          if (showRslts[0].selfie) {
            removePicture(doc.picture, function () {
              
            });
          }
          // removing is over
          switch(showRslts.length){
            case 1:
              config.MySQL.query(del_kfc, [req.doc.sn], function (err, results) {
                if(err) throw err;
                switch(results.affectedRows)
                {
                  case 1:
                    res.status(201).json({
                      message: "You have successfully wiped out the users history",
                      status: 201
                    });
                    break;
                  case 0:
                    res.status(200).json({
                      message: "You wiped the user profile", status: 200
                    })
                    break;
                  default:
                }
              });
              break;
            default:
          }
        });
        break;
      case 0:
        res.status(404).json({
          error: true,
          message: "There is no data id ",
          status: 404
        });
        break;
      default:
    }
    function removePicture(pic_url, callback) {
      fs.unlink(config.MEDIA.UPLOADES + pic_url, function (err) {
        callback();
      });
    }
  });
};

exports.searchCustomer = function searchCustomer(req,res,next){
  var body = req.body; var tbl_name = 'users';  var tra_tbl = 'transaction_history';
  if(isEmpty(body.email) && isEmpty(body.mobile))
  {
    res.status(400).json({
      error: true, messag: 'Please enter either mobile or email to search for the user', status: 400
    })
  }
  else if(isEmpty(body.mobile) && (body.email))
  {
    var checkEmail = 'SELECT * FROM '+tbl_name+' WHERE email = ?'; 
    config.MySQL.query(checkEmail, [body.email], function (err, result) {
      if(err) throw err;
      switch(result.length)
      {
        case 0:
          res.status(200).json({error: true, message: 'There is no email address in this database', status: 200});
          break;
        default:
          var trans = 'SELECT * FROM `'+tra_tbl+'` WHERE user_id = ?';
          config.MySQL.query(trans, [result[0].sn], function (err, results) {
            if(err) throw err;
            switch(results.length)
            {
              case 0:
                var i;
                for(i=0;i<result.length;i++)
                {
                  delete result[i].password
                }
                res.status(200).json(result);
                break;
              default:
                var i;
                for(i=0;i<result.length;i++)
                {
                  delete result[i].password
                }
                res.status(200).json({
                  info: result,
                  transaction_history: results
                })
            }
          });
          
      }
    });
  }
  else if(isEmpty(body.email) && (body.mobile))
  {
    var checkEmail = 'SELECT * FROM '+tbl_name+' WHERE mobile = ?';
    config.MySQL.query(checkEmail, [body.mobile], function (err, result) {
      if(err) throw err;
      switch(result.length)
      {
        case 0:
          res.status(200).json({error: true, message: 'There is no mobile address in this database', status: 200});
          break;
        default:
          var i;
          for(i=0;i<result.length;i++)
          {
            delete result[i].password
          }
          res.status(200).json(result)
      }
    });
  }
}

exports.accessPermission = function accessPermission(roles,action){
  action = action || 'ALLOW';
  return function(req,res,next){
    /** 
     * customer 
     * begin
     */
      const customers = req._user[0].user_customers;
      if(!customers) {
        return next(CustomError({
          name: 'AUTHORIZATION_ERROR',
          message: 'Please Login or register to continue'
        }));
      }
      var tbt = 'users';
      var check_tknUsrID = 'SELECT sn, type FROM '+tbt+' WHERE sn = ?';
      config.MySQL.query(check_tknUsrID, [customers], function (err, chckit) {
        if(err) throw err; 
        var userRole  = chckit[0].type;
        console.log(chckit[0].type);
        var allowed   = false;
        roles = Array.isArray(roles) ? roles: [roles];
        roles.forEach(function(type) {
          switch(type) {
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
  }
}