// Load Module Dependencies
var events       = require('events');
var moment       = require('moment');       // date and time displayer
var nodemailer   = require('nodemailer');   // email sending 
var async        = require('async');
var config            = require('../config');
const {telalaki} = require('../app');
//var contractDal       = require('../dal/contract'); // call out the contract dal 


// no operation(noop) function
exports.noop = function noop(req, res, next) {
  res.json({
    error:false,
    message: 'To be implemented!'
  });
};

exports.validateNotifi = function validateNotifi(req, res, next, id) {
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
    var tbl = 'notifications';
    var show_tbl = "SELECT sn, user, msg, redirect, extra, created_at FROM "+tbl+" WHERE sn = ?";
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

exports.create = function create(req, res, next) {
        var body = req.body;
        var date = new Date();
        var nowSeconds = date.getTime() / 1000; //1440516958
        var now = moment().toISOString();
        req.checkBody('user').notEmpty().withMessage('You did not select the user');
        req.checkBody('msg').notEmpty().withMessage('Please enter the message');
        req.checkBody('redirect').notEmpty().withMessage('Add the redirection');
        req.checkBody('extra').notEmpty().withMessage('Please enter the phone number');
        //training_date
        var validationErrors = req.validationErrors();
        if (validationErrors) {
            res.status(400);
            res.json(validationErrors);
            return;
        }
        body.created_at = nowSeconds;
        //body.helper = req._user.helper;
        var tbl = 'notifications'
        var sql = "INSERT INTO "+tbl+" (user, msg, redirect, extra, created_at) VALUES (?,?,?,?,?)";
        var parameters = [body.user, body.msg, body.redirect,body.extra,nowSeconds];
        config.MySQL.query(sql, parameters, function (err, result) {
          if(err) throw err;
          console.log(result.affectedRows);
          switch(result.affectedRows)
          {
            case 1:
              res.status(200).json({
                message: 'You have succesfully notified'
              });
              break;
            case 0:
              res.status(400).json({
                error: true,
                message: 'Error Occured on your SQL query'
              });
              break;
            default:
              res.status(401).json({
                error: true,
                messsage: 'Bad Request gateaway',
                status: 401
              })
          }
        });
};

exports.fetchOne= function fetchOne(req, res, next){
  var sn = req.doc.sn;
  var tbl = 'notifications';
  var show_tbl = 'SELECT * FROM `'+tbl+'` WHERE `sn` = ?';
  config.MySQL.query(show_tbl, [sn], function (err, result) {
    if(err) throw err;
    switch(result.length)
    {
      case 1:
        res.status(200);
        res.json({data: result, status: 200
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
    
};

exports.fetchAll= function fetchAll(req,res,next){
  var tbl_name = 'notifications';
  var YourQuery = 'SELECT * FROM '+tbl_name+'';
  config.MySQL.query(YourQuery, (error, results)=> {
    if(error) throw error;
    switch(results.length)
    {
      case 0:
        res.status(200).json({
          error: true, message: 'No message in your database!', status: 200
        });
        break;
      default:
        res.status(200).json(results);
        break;
    }
  });
};


exports.users= function users(req,res,next){
  console.log(req._user[0].sn);
  var notTbl = 'notifications';
  var notQuery = 'SELECT * FROM `'+notTbl+'` WHERE `user` = ?';
  config.MySQL.query(notQuery, [req._user[0].user_customers], function (err, result) {
    if(err) throw err;
    switch(result.length){
      case 0:
        res.status(200).json({ message: 'There are no notification for you!', status: 200})
        break;
      default:
        res.status(200).json(result);
    }
  });
};

exports.update = function update(req, res, next){
    var body = req.body;
    var sn = req.doc.sn;
    var tbl = 'notifications';
    var show_tbl = "UPDATE "+tbl+" set user = ?, msg = ?, redirect = ?, extra =? WHERE sn = ?";
    config.MySQL.query(show_tbl, [body.user, body.msg, body.redirect, body.extra, sn], function (err, result) {
      if (err) throw err;
      switch (result.length) {
        case 0:
          console.log('result');
          res.status(200);
          res.json({
            error: false,
            message: "there are no data",
            status: 200
          })
          break;
        default:
          switch(result.changedRows)
          {
            case 1:
              res.status(200).json({ error: false, message: "You have updated your Notifications successfully :)", status: 200 });
              break;
            case 0:
              res.status(200).json({ error: false, message: "You have not changed anything :)", status: 200 });
              break;
            default:
          }
      }
    });
};

exports.deleteNotifi = (req, res, next) => {
  var sn = req.doc.sn;
  var tbl = 'notifications';
  var show_tbl = 'DELETE FROM `'+tbl+'` WHERE `sn` = ?';
  config.MySQL.query(show_tbl, [sn], function (err, result) {
    if (err) throw err;
      switch(result.affectedRows)
      {
        case 1:
          res.status(200).json({
            message: "You have succesfully removed notification from your database",
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
};