// Load Module Dependencies
var events       = require('events');
var moment       = require('moment');       // date and time displayer
var config      = require('../config');
var async = require('async');
var bcrypt       = require('bcrypt');
const _ = require("lodash");
var fs = require('fs');

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
    var tbl = 'bank_accounts';
    var show_tbl = "SELECT sn, user_id, bank_name, account_number, iban, bic, is_default, created_at FROM "+tbl+" WHERE sn = ?";
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

exports.fetchOne = function fetchOne(req,res,next){
    var tbl = 'bank_accounts';
    var show_tbl = "SELECT sn, user_id, bank_name, account_number, iban, bic, is_default, created_at FROM `"+tbl+"` WHERE sn = ?";
    config.MySQL.query(show_tbl, [req.doc.sn], function (err, result) {
        if(err) throw err;
        switch(Object.keys(result).length)
        {
            case 0:
                res.status(200).json({message: 'there are no bank account informations from users', status: 200});
                break;
            default:
                res.status(200).json(result);
        }
    });
}

exports.fetchUser = function fetchUser(req,res,next){
    var tbl = 'bank_accounts';
    var show_tbl = "SELECT sn, user_id, bank_name, account_number, iban, bic, is_default, created_at FROM `"+tbl+"` WHERE user_id = ?";
    config.MySQL.query(show_tbl, [req._user[0].user_customers], function (err, result) {
        if(err) throw err;
        switch(Object.keys(result).length)
        {
            case 0:
                res.status(200).json({message: 'there are no bank account informations from users', status: 200});
                break;
            default:
                res.status(200).json(result);
        }
    });
}

exports.fetchAll = function fetchAll(req,res,next){
    var tbl = 'bank_accounts';
    var show_tbl = "SELECT sn, user_id, bank_name, account_number, iban, bic, is_default, created_at FROM `"+tbl+"`";
    config.MySQL.query(show_tbl, function (err, result) {
        if(err) throw err;
        switch(Object.keys(result).length)
        {
            case 0:
                res.status(200).json({message: 'there are no bank account informations from users', status: 200});
                break;
            default:
                res.status(200).json(result);
        }
    });
}

exports.create = function create(req,res,next){
    var body = req.body;
    var date = new Date();
    var nowSeconds = date.getTime() / 1000; //1440516958
    var now = moment().toISOString();
    req.checkBody('user_id').notEmpty().withMessage('User ID is not defined');
    req.checkBody('bank_name').notEmpty().withMessage('Bank Name should not be empty');
    req.checkBody('account_number', 'Bank Account Number should not be empty!').isEmail().withMessage("Username should be email").notEmpty();
    req.checkBody('iban').notEmpty().withMessage('IBAN should not be empty');
    req.checkBody('bic').notEmpty().withMessage('BIC should not be empty');
    req.checkBody('is_default').notEmpty().withMessage('is_default should not be empty');
    var validationErrors = req.validationErrors();
    if (validationErrors) {
      res.status(400);
      res.json(validationErrors);
      return;
    }
    var tbl_usr = 'users'; var tbl_bnk = 'bank_accounts';
    var show_usr = "SELECT sn, mobile, name, email, password, wallet, kyc, country, country_code, token, wallet_limit, active, created_at FROM "+tbl_usr+" WHERE sn = ?";
    
    config.MySQL.query(show_usr, [req._user[0].user_customers], function (err, userInfo) {
        if(err) throw err;
        switch(userInfo.length){
            case 0:
                res.status(400).json({
                    error: true, message: 'You are not recognized!', status: 400
                });
                break;
            default:
                var Int_QRY = 'INSERT INTO '+tbl_bnk+' (user_id, bank_name, account_number, iban, bic, is_default, created_at) VALUES (?,?,?,?,?,?,?)';
                const Param = [req._user[0].user_customers, body.bank_name, body.account_number, body.iban, body.bic, body.is_default, nowSeconds];
                config.MySQL.query(Int_QRY, Param, function (err, BankINFO) {
                    if(err) throw err;
                    switch(BankINFO.affectedRows)
                    {
                        case 0:
                            res.status(400).json({
                                error: true, message: "Data is not saved in the database :(", status: 400
                            });
                            break;
                        default:
                            res.status(201).json({
                                message: "Successfully stored into the database!", status: 201
                            })
                    }
                });
        }
    });
}

exports.updateBank = function updateBank(req,res,next){
    var body = req.body;
    var sn = req._user[0].user_customers;
    var tbl = 'bank_accounts';
    var show_tbl = "UPDATE "+tbl+" set bank_name = ?, account_number = ?, iban = ?, bic = ?, is_default = ? WHERE user_id = ?";
    config.MySQL.query(show_tbl, [body.bank_name, body.account_number, body.iban, body.bic, body.is_default, sn], function (err, result) {
        if(err) throw err;
        switch(result.changedRows)
        {
            case 0:
                res.status(400).json({
                    error: true, message: 'Not updated! Try Again!', status: 400
                });
                break;
            default:
                res.status(200).json({
                    message: 'Update successful', status: 200
                });
        }
    });
}

exports.removeBank = function removeBank(req,res,next){
    var body = req.body;
    var sn = req._user[0].user_customers;
    var tbl = 'bank_accounts';
    var show_tbl = "DELETE FROM "+tbl+" WHERE user_id = ?";
    config.MySQL.query(show_tbl, [sn], function (err, result) {
        if(err) throw err;
        switch(result.affectedRows)
        {
            case 0:
                res.status(400).json({
                    error: true, message: 'Not Removed! Try Again!', status: 400
                });
                break;
            default:
                res.status(200).json({
                    message: 'Bank Account Removed successfully', status: 200
                });
        }
    });
}

exports.update = function update(req,res,next){
    var body = req.body;
    var sn = req.doc.sn;
    var tbl = 'bank_accounts';
    var show_tbl = "UPDATE "+tbl+" set bank_name = ?, account_number = ?, iban = ?, bic = ?, is_default = ? WHERE sn = ? AND user_id = ?";
    config.MySQL.query(show_tbl, [body.bank_name, body.account_number, body.iban, body.bic, body.is_default, sn, req._user[0].sn], function (err, result) {
        if(err) throw err;
        switch(result.changedRows)
        {
            case 0:
                res.status(400).json({
                    error: true, message: 'Not updated! Try Again!', status: 400
                });
                break;
            default:
                res.status(200).json({
                    message: 'Update successful', status: 200
                });
        }
    });
}

exports.deleteBank = function deleteBank(req,res,next){
    const sn = req.doc.sn;
    var tbl = 'bank_accounts';
    var show_tbl = "DELETE FROM "+tbl+" WHERE sn = ? AND user_id = ?";
    config.MySQL.query(show_tbl, [sn], [req._user[0].sn], function (err, result) {
        if (err) throw err;
        switch(result.affectedRows)
        {
            case 1:
                res.status(200).json({
                    message: "You have succesfully removed "+tbl+" from your database",
                    status: 200
                });
                break;
            case 0:
                res.status(400).json({
                    message: "An error occured! Nothing is removed",
                    status: 400
                });
                break;
            default:
                res.status(401).json({
                    error: true, message: "Something occured in your database and is not functioning propely!", error_message: err, status: 401
                });
        }
    });
}