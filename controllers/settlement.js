// Load Module Dependencies
var events       = require('events');
var moment       = require('moment');       // date and time displayer
const _ = require("lodash");
const config = require('../config');

// no operation(noop) function
exports.noop = function noop(req, res, next) {
  res.json({
    error:false,
    message: 'To be implemented!'
  });
};

exports.validatesettle = function validatesettle(req, res, next, id) {
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
    var tbl = 'settlement';
    var show_tbl = "SELECT * FROM "+tbl+" WHERE id = ?";
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
  req.checkBody('amount').notEmpty().withMessage('Amount must not be empty!');
  req.checkBody('account_id').notEmpty().withMessage('Account must be selected!');
  var validationErrors = req.validationErrors();
  if (validationErrors) {
    res.status(400);
    res.json(validationErrors);
    return;
  }
  var tbl = 'settlement';
  var sql = "INSERT INTO "+tbl+" (user_id, amount, reason, created_at) VALUES (?,?,?,?)";
  var Param = [req._user[0].user_customers, body.amount, body.reason,nowSeconds];
  config.MySQL.query(sql, Param, function (err, result) {
    if(err) throw err; 
    switch(result.affectedRows)
    {
      case 1:
        res.status(201).json({
            message:'You have sent your '+tbl+' successfully', status: 201
        })
        break;
      case 0:
          res.status(200).json({
              error: true, message: "Nothing happened on the database please try again", status: 200
          })
        break;
      default:
          res.status(400).json({
              error: true, message: "please try again later!", status: 200
          })
    }
  });
};

exports.fetchOne= function fetchOne(req, res, next){
  var tbl = 'settlement';
  var show_tbl = "SELECT * FROM "+tbl+" WHERE sn = ?";
  config.MySQL.query(show_tbl, [req.doc.sn], function (err, result) {
    if (err) throw err;
    switch(result.length)
    {
      case 1:
        res.status(200).json(result);
        break;
      case 0:
        res.status(404).json({message: "data does not exist", status: 404});
        break;
      default:
    }
  });
};
//607056bea1ecf7da36512afb <<--- what is this what id is this 
exports.fetchAll= function fetchAll(req,res,next){
  var tbl = 'settlement';
  var show_tbl = "SELECT * FROM "+tbl+"";
  config.MySQL.query(show_tbl, function (err, result) {
    if (err) throw err;
    switch(result.length)
    {
      case 0:
        res.status(200).json({
          message: "There is no entry in the database section", status: 200
        });
        break;
      default:
        res.status(200).json(result);
    }
  });
  
};

exports.update = function update(req, res, next){
  const sn = req.doc.sn;
    var body = req.body;
    var tbl = 'settlement';
    var show_tbl = "UPDATE "+tbl+" set amount = ?, reason = ?, status=? WHERE sn = ?";
    config.MySQL.query(show_tbl, [body.amount, body.reason, body.status, sn], function (err, result) {
      if (err) throw err;
      
          switch(result.changedRows)
          {
            case 1:
              res.status(200).json({
                message: "You have successfully changed data", status: 200
              })
              break;
            default:
              res.status(200).json({
                message: "No change occured", status: 200
              });
          }
      
    });
};

exports.deletesettle = (req, res, next) => {
  const sn = req.doc.sn;
  var tbl = 'settlement';
  var show_tbl = "DELETE FROM "+tbl+" WHERE sn = ?";
  config.MySQL.query(show_tbl, [sn], function (err, result) {
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
};