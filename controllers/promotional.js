// Load Module Dependencies
var events = require('events');
var moment = require('moment'); // date and time displayer
var config            = require('../config');
const _ = require("lodash");
const { isEmpty } = require('lodash');
// no operation(noop) function
exports.noop = function noop(req, res, next) {
  res.json({
    error: false,
    message: 'To be implemented!'
  });
};

exports.validateLecture = function validateLecture(req, res, next, id) {
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
    var tbl = 'promotional_slider';
    var show_tbl = "SELECT sn, image, redirect, active, created_at FROM "+tbl+" WHERE sn = ?";
    config.MySQL.query(show_tbl, [id], function (err, result) {
      if (err) throw err;
      switch(result.length)
      {
        case 1:
          if(result[0].sn)
          {
            req.doc = result[0];
            next();
          }
          else{
            console.log(result[0])
            res.status(404).json({
              error: true, status: 404,
              msg: 'promotional_slider Serial Number (sn) ' + id + ' not found'
            });
          }
          break;
        default: 
          res.status(404).json({
            error: true, status: 404,
            msg: 'promotional_slider Serial Number (sn) ' + id + ' not found'
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
  req.checkBody('redirect').notEmpty().withMessage('Redirect name should not be empty');
  var validationErrors = req.validationErrors();
  if (validationErrors) {
    res.status(400);
    res.json(validationErrors);
    return;
  }
  if (!req.files[0]) {
    res.status(400);
    res.json({
      msg: "Please select file for upload"
    });
    return;
  }else{
    let dest1 = 'uploads/' + req.files[0].filename;
    body.image = dest1;
    var tbl = 'promotional_slider';
    var IntQYR = 'INSERT INTO '+tbl+' (image, redirect, active, created_at) VALUES (?,?,?,?)';
    var Param = [body.image, body.redirect,1,nowSeconds];
    config.MySQL.query(IntQYR, Param, function (err, result) {
      if(err) throw err;
      switch(result.affectedRows){
        case 1:
          res.status(201).json({
            message: "Successfully Uploaded", status: 201
          });
          break;
        case 0:
          res.status(400).json({
            error: true, message: 'Banner not uploaded :(', status: 400
          })
          break;
        default:
      }
    });
  }
};

exports.fetchOne = function fetchOne(req, res, next) {
  var sn = req.doc.sn;
  var tbl = 'promotional_slider';
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
//607056bea1ecf7da36512afb

exports.fetchAll = function fetchAll(req, res, next) {
  var tbl_name = 'promotional_slider';
  var YourQuery = 'SELECT * FROM '+tbl_name+'';
  config.MySQL.query(YourQuery, (error, results)=> {
    if(error) throw error;
    switch(results.length)
    {
      case 0:
        res.status(200).json({
          error: true, message: 'No data!', status: 200
        });
        break;
      default:
        res.status(200).json(results);
        break;
    }
  });
};

exports.update = function update(req, res, next) {
  var body = req.body;
    var sn = req.doc.sn;
    var tbl = 'promotional_slider';
    var show_tbl = "UPDATE "+tbl+" set redirect = ?, active = ? WHERE sn = ?";
    config.MySQL.query(show_tbl, [body.redirect, body.active, sn], function (err, result) {
      if (err) throw err;
      switch (result.length) {
        case 0:
          console.log('result');
          res.status(400);
          res.json({
            error: false,
            message: "No data exist",
            status: 400
          })
          break;
        default:
          switch(result.changedRows)
          {
            case 1:
              res.status(200).json({ error: false, message: "You have updated your "+tbl+" successfully :)", status: 200 });
              break;
            case 0:
              res.status(200).json({ error: false, message: "You have not changed anything :)", status: 200 });
              break;
            default:
          }
      }
    });
};

exports.updateImg = function updateImg (req, res, next){
  var body = req.body;
  var sn = req.doc.sn;
  if (!req.files[0]) {
    res.status(400);
    res.json({
      msg: "Please select file for upload"
    });
    return;
  }else{
    let dest1 = 'uploads/' + req.files[0].filename;
    body.image = dest1;
    var tbl = 'promotional_slider';
    var show_tbl = "UPDATE "+tbl+" set image = ? WHERE sn = ?";
    config.MySQL.query(show_tbl, [body.image, sn], function (err, result) {
      if (err) throw err;
      switch (result.length) {
        case 0:
          console.log('result');
          res.status(400);
          res.json({
            error: false,
            message: "No data exist",
            status: 400
          })
          break;
        default:
          switch(result.changedRows)
          {
            case 1:
              res.status(200).json({ error: false, message: "You have updated your "+tbl+" picture successfully :)", status: 200 });
              break;
            case 0:
              res.status(200).json({ error: false, message: "You have not changed anything :)", status: 200 });
              break;
            default:
          }
      }
    });
  }
}

exports.deleteLecture = (req, res, next) => {
  var sn = req.doc.sn;
  var tbl = 'promotional_slider';
  var show_tbl = 'DELETE FROM `'+tbl+'` WHERE `sn` = ?';
  config.MySQL.query(show_tbl, [sn], function (err, result) {
    if (err) throw err;
      switch(result.affectedRows)
      {
        case 1:
          res.status(200).json({
            message: "You have succesfully removed `"+tbl+"` from your database",
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