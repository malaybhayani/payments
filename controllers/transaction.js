// Load Module Dependencies
var events = require('events');
var moment = require('moment'); // date and time displayer
var nodemailer = require('nodemailer'); // email sending 
var async = require('async');
var config = require('../config');
const {
    now, isEmpty
} = require('lodash');

// no operation(noop) function
exports.noop = function noop(req, res, next) {
    res.json({
        error: false,
        message: 'To be implemented!'
    });
};

exports.validatepayment = function validatepayment(req, res, next, id) {
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
        var tbl = 'transaction_history';
        var show_tbl = "SELECT sn, user_id, amount, type, extra_info, created_at FROM "+tbl+" WHERE sn = ?";
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
                    msg: 'Tranaction Serial Number (sn) ' + id + ' not found'
                    });
                }
                break;
                default: 
                res.status(404).json({
                    error: true, status: 404,
                    msg: 'Tranaction Serial Number (sn) ' + id + ' not found'
                });
            }
        });
    }
};

exports.create = function create(req, res, next) {
    var body = req.body;
    var date = new Date();
    var nowSeconds = date.getTime() / 1000; //1440516958
    req.checkBody('amount').notEmpty().withMessage('Amount Should not be empty');
    req.checkBody('type').notEmpty().withMessage('Type Should not be empty');
    req.checkBody('extra_info').notEmpty().withMessage('Must add the Phone number');
    req.checkBody('trans_type').notEmpty().withMessage('Must select the type of transaction gateway')
    var validationErrors = req.validationErrors();
    if (validationErrors) {
        res.status(400);
        res.json(validationErrors);
        return;
    }
    body.created_at = nowSeconds;
        //body.helper = req._user.helper;
        var tbl = 'transaction_history';
        if(isEmpty(body.receiverID)) { var rec = 0 }
        else { var rec = body.receiverID }
        var sql = "INSERT INTO "+tbl+" (user_id, amount, type, trans_type,receiverID, extra_info, created_at) VALUES (?,?,?,?,?,?,?)";
        var parameters = [req._user[0].user_customers, body.amount, body.type,body.trans_type,rec,body.extra_info,nowSeconds];
        config.MySQL.query(sql, parameters, function (err, result) {
            if(err) throw err;
            console.log(result.insertId);
            switch(result.affectedRows)
            {
                case 1:
                    //res.status(201).json({ message: 'data transaction succssfully saved', status: 201 });
                    var tbl_wall = 'wallet';
                    var tran_paypal = 'paypal_transactions';
                    var tran_card = 'transaction_card';
                    var tran_bank = 'transaction_bank';
                    var show_tbl = 'SELECT * FROM '+tbl_wall+' WHERE userid = ?';
                    switch(body.type)
                    {
                        case 1: // adding to wallet transaction
                            config.MySQL.query(show_tbl, [req._user[0].user_customers], function (err, shoWallet) {
                                if(err) throw err;
                                console.log(shoWallet);
                                if(shoWallet.length > 0)
                                {
                                    let x = shoWallet[0].Amount;
                                    let y = body.amount
                                    let Amount = x + y;
                                    console.log(Amount);
                                    var update_tbl = "UPDATE "+tbl_wall+" set Amount = ? WHERE userid = ?";
                                    config.MySQL.query(update_tbl, [Amount, req._user[0].user_customers], function (err, updWallet) {
                                        if(err) throw err;
                                        switch(updWallet.changedRows)
                                        {
                                            case 1:
                                                switch(body.trans_type)
                                                    {
                                                        case 1:
                                                            var InstQRY = 'INSERT INTO '+tran_paypal+' (user_id, transaction_id, amount, created_at) VALUES (?,?,?,?)';
                                                            var Params = [req._user[0].user_customers, result.insertId,body.amount,nowSeconds];
                                                            config.MySQL.query(InstQRY, Params, function (err, pay_trans) {
                                                                if(err) throw err;
                                                                if(pay_trans.affectedRows > 0)
                                                                {
                                                                    res.status(201).json({
                                                                        message: 'Transaction successfully stored into database', status: 201
                                                                    })
                                                                }
                                                                else{
                                                                    config.MySQL.query(show_tbl, [req._user[0].user_customers], function (err, upgWallet) {
                                                                        if(err) throw err;
                                                                        console.log(upgWallet);
                                                                        if(upgWallet.length > 0)
                                                                        {
                                                                            let a = upgWallet[0].Amount;
                                                                            let b = body.amount
                                                                            let C = a - b;
                                                                            var update_tbll = "UPDATE "+tbl_wall+" set Amount = ? WHERE userid = ?";
                                                                            config.MySQL.query(update_tbll, [C, req._user[0].user_customers], function (err, downWallet) {
                                                                                if(err) throw err;
                                                                                switch(downWallet.changedRows)
                                                                                {
                                                                                    case 1:
                                                                                        res.status(200).json({
                                                                                            message: "There was an error on the transaction. Nothing changed you are safe :). Your wallet is restored!",
                                                                                            status: 200
                                                                                        })
                                                                                        break;
                                                                                    case 0:
                                                                                        res.status(400).json({
                                                                                            error: true,
                                                                                            message: "Please contact your admin ASAP. Something has gone wrong. You did not made a transaction but your wallet was deducted please make contact",
                                                                                            status: 400
                                                                                        });
                                                                                        break;
                                                                                    default:
                                                                                }
                                                                            });
                                                                        }
                                                                    });
                                                                    res.status(400).json({
                                                                        error: true, message: "Error Occured in the database", status: 400
                                                                    })
                                                                }
                                                            });
                                                            break;
                                                        case 2:
                                                            var InstQRY = 'INSERT INTO '+tran_bank+' (userid, transaction_id, amount, created_at, reference_no) VALUES (?,?,?,?,?)';
                                                            var Params = [req._user[0].user_customers, result.insertId,body.amount,nowSeconds, body.reference_no];
                                                            config.MySQL.query(InstQRY, Params, function (err, bnk_trans) {
                                                                if(err) throw err;
                                                                if(bnk_trans.affectedRows > 0)
                                                                {
                                                                    res.status(201).json({
                                                                        message: 'Transaction successfully stored into database', status: 201
                                                                    })
                                                                }
                                                                else{
                                                                    var DELETE_QRY = 'DELETE FROM '+tbl+' WHERE SN = ?'; 
                                                                    config.MySQL.query(DELETE_QRY, [result.insertId], function (err, Del_trans) {
                                                                        if(err) throw err;
                                                                        if(Del_trans.affectedRows > 0)
                                                                        {
                                                                            config.MySQL.query(show_tbl, [req._user[0].user_customers], function (err, upgWallet) {
                                                                                if(err) throw err;
                                                                                console.log(upgWallet);
                                                                                if(upgWallet.length > 0)
                                                                                {
                                                                                    let a = upgWallet[0].Amount;
                                                                                    let b = body.amount
                                                                                    let C = a + b;
                                                                                    var update_tbll = "UPDATE "+tbl_wall+" set Amount = ? WHERE userid = ?";
                                                                                    config.MySQL.query(update_tbll, [C, req._user[0].user_customers], function (err, downWallet) {
                                                                                        if(err) throw err;
                                                                                        switch(downWallet.changedRows)
                                                                                        {
                                                                                            case 1:
                                                                                                res.status(200).json({
                                                                                                    message: "There was an error on the transaction. Nothing changed you are safe :). Your wallet is restored!",
                                                                                                    status: 200
                                                                                                })
                                                                                                break;
                                                                                            case 0:
                                                                                                res.status(400).json({
                                                                                                    error: true,
                                                                                                    message: "Please contact your admin ASAP. Something has gone wrong. You did not made a transaction but your wallet was deducted please make contact",
                                                                                                    status: 400
                                                                                                });
                                                                                                break;
                                                                                            default:
                                                                                        }
                                                                                    });
                                                                                }
                                                                            });
                                                                        }
                                                                    });
                                                                    // res.status(400).json({
                                                                    //     error: true, message: "Error Occured in the database", status: 400
                                                                    // })
                                                                }
                                                            });
                                                            break;
                                                        case 3:
                                                            var InstQRY = 'INSERT INTO '+tran_card+' (userid, transaction_id, amount, created_at, reference_no) VALUES (?,?,?,?,?)';
                                                            const Param = [req._user[0].user_customers, result.insertId,body.amount,nowSeconds, body.reference_no];
                                                            config.MySQL.query(InstQRY, Param, function (err, crd_trans) {
                                                                if(err) throw err;
                                                                if(crd_trans.affectedRows > 0)
                                                                {
                                                                    res.status(201).json({
                                                                        message: 'Transaction successfully stored into database', status: 201
                                                                    })
                                                                }
                                                                else{
                                                                    var DELETE_QRY = 'DELETE FROM '+tbl+' WHERE SN = ?'; 
                                                                    config.MySQL.query(DELETE_QRY, [result.insertId], function (err, Del_trans) {
                                                                        if(err) throw err;
                                                                        if(Del_trans.affectedRows > 0)
                                                                        {
                                                                            config.MySQL.query(show_tbl, [req._user[0].user_customers], function (err, upgWallet) {
                                                                                if(err) throw err;
                                                                                console.log(upgWallet);
                                                                                if(upgWallet.length > 0)
                                                                                {
                                                                                    let a = upgWallet[0].Amount;
                                                                                    let b = body.amount
                                                                                    let C = a + b;
                                                                                    var update_tbll = "UPDATE "+tbl_wall+" set Amount = ? WHERE userid = ?";
                                                                                    config.MySQL.query(update_tbll, [C, req._user[0].user_customers], function (err, downWallet) {
                                                                                        if(err) throw err;
                                                                                        switch(downWallet.changedRows)
                                                                                        {
                                                                                            case 1:
                                                                                                res.status(200).json({
                                                                                                    message: "There was an error on the transaction. Nothing changed you are safe :). Your wallet is restored!",
                                                                                                    status: 200
                                                                                                })
                                                                                                break;
                                                                                            case 0:
                                                                                                res.status(400).json({
                                                                                                    error: true,
                                                                                                    message: "Please contact your admin ASAP. Something has gone wrong. You did not made a transaction but your wallet was deducted please make contact",
                                                                                                    status: 400
                                                                                                });
                                                                                                break;
                                                                                            default:
                                                                                        }
                                                                                    });
                                                                                }
                                                                            });
                                                                        }
                                                                    });
                                                                    // res.status(400).json({
                                                                    //     error: true, message: "Error Occured in the database", status: 400
                                                                    // })
                                                                }
                                                            });
                                                            break;
                                                        default:
                                                    }
                                                break;
                                            case 0:
                                                res.status(200).json({
                                                    error: true, message: "Nothing happened", status: 200
                                                })
                                                break;
                                            default:
                                                res.status(400).json({
                                                    error: true, message: "Error Occurred", status: 400
                                                })
                                        }
                                    });
                                }
                                else{
                                    res.status(400).json({
                                        error: true, 
                                        message: "Please add Money on your wallet",
                                        status: 400
                                    })
                                }
                            });
                            
                            break;
                        case 2: //making transaction from wallet (subtracting)
                            config.MySQL.query(show_tbl, [req._user[0].user_customers], function (err, shoWallet) {
                                if(err) throw err;
                                if(shoWallet.length > 0){
                                    if(shoWallet[0].Amount < body.amount){
                                        res.status(403).json({
                                            error: true,
                                            message: 'Your balance in the wallet is very low! You cannot make a transaction',
                                            status: 403
                                        })
                                    }
                                    else if(shoWallet[0].Amount >= body.amount) {
                                        var Amount = shoWallet[0].Amount - body.amount;
                                        var update_tbl = "UPDATE "+tbl_wall+" set Amount = ? WHERE userid = ?";
                                        config.MySQL.query(update_tbl, [Amount, req._user[0].user_customers], function (err, updWallet) {
                                            if(err) throw err;
                                            switch(updWallet.changedRows)
                                            {
                                                case 1:
                                                    // res.status(201).json({
                                                    //     message: "Transaction successful", status: 201
                                                    // })
                                                    switch(body.trans_type)
                                                    {
                                                        case 1:
                                                            var InstQRY = 'INSERT INTO '+tran_paypal+' (user_id, transaction_id, amount, created_at) VALUES (?,?,?,?)';
                                                            var Params = [req._user[0].user_customers, result.insertId,body.amount,nowSeconds];
                                                            config.MySQL.query(InstQRY, Params, function (err, pay_trans) {
                                                                if(err) throw err;
                                                                if(pay_trans.affectedRows > 0)
                                                                {
                                                                    res.status(201).json({
                                                                        message: 'Transaction successfully stored into database', status: 201
                                                                    })
                                                                }
                                                                else{
                                                                    var DELETE_QRY = 'DELETE FROM '+tbl+' WHERE SN = ?'; 
                                                                    config.MySQL.query(DELETE_QRY, [result.insertId], function (err, Del_trans) {
                                                                        if(err) throw err;
                                                                        if(Del_trans.affectedRows > 0)
                                                                        {
                                                                            config.MySQL.query(show_tbl, [req._user[0].user_customers], function (err, upgWallet) {
                                                                                if(err) throw err;
                                                                                console.log(upgWallet);
                                                                                if(upgWallet.length > 0)
                                                                                {
                                                                                    let a = upgWallet[0].Amount;
                                                                                    let b = body.amount
                                                                                    let C = a + b;
                                                                                    var update_tbll = "UPDATE "+tbl_wall+" set Amount = ? WHERE userid = ?";
                                                                                    config.MySQL.query(update_tbll, [C, req._user[0].user_customers], function (err, downWallet) {
                                                                                        if(err) throw err;
                                                                                        switch(downWallet.changedRows)
                                                                                        {
                                                                                            case 1:
                                                                                                res.status(200).json({
                                                                                                    message: "There was an error on the transaction. Nothing changed you are safe :). Your wallet is restored!",
                                                                                                    status: 200
                                                                                                })
                                                                                                break;
                                                                                            case 0:
                                                                                                res.status(400).json({
                                                                                                    error: true,
                                                                                                    message: "Please contact your admin ASAP. Something has gone wrong. You did not made a transaction but your wallet was deducted please make contact",
                                                                                                    status: 400
                                                                                                });
                                                                                                break;
                                                                                            default:
                                                                                        }
                                                                                    });
                                                                                }
                                                                            });
                                                                        }
                                                                    });
                                                                }
                                                            });
                                                            break;
                                                        case 2:
                                                            var InstQRY = 'INSERT INTO '+tran_bank+' (userid, transaction_id, amount, created_at, reference_no) VALUES (?,?,?,?,?)';
                                                            var Params = [req._user[0].user_customers, result.insertId,body.amount,nowSeconds, body.reference_no];
                                                            config.MySQL.query(InstQRY, Params, function (err, bnk_trans) {
                                                                if(err) throw err;
                                                                if(bnk_trans.affectedRows > 0)
                                                                {
                                                                    res.status(201).json({
                                                                        message: 'Transaction successfully stored into database', status: 201
                                                                    })
                                                                }
                                                                else{
                                                                    var DELETE_QRY = 'DELETE FROM '+tbl+' WHERE SN = ?'; 
                                                                    config.MySQL.query(DELETE_QRY, [result.insertId], function (err, Del_trans) {
                                                                        if(err) throw err;
                                                                        if(Del_trans.affectedRows > 0)
                                                                        {
                                                                            config.MySQL.query(show_tbl, [req._user[0].user_customers], function (err, upgWallet) {
                                                                                if(err) throw err;
                                                                                console.log(upgWallet);
                                                                                if(upgWallet.length > 0)
                                                                                {
                                                                                    let a = upgWallet[0].Amount;
                                                                                    let b = body.amount
                                                                                    let C = a + b;
                                                                                    var update_tbll = "UPDATE "+tbl_wall+" set Amount = ? WHERE userid = ?";
                                                                                    config.MySQL.query(update_tbll, [C, req._user[0].user_customers], function (err, downWallet) {
                                                                                        if(err) throw err;
                                                                                        switch(downWallet.changedRows)
                                                                                        {
                                                                                            case 1:
                                                                                                res.status(200).json({
                                                                                                    message: "There was an error on the transaction. Nothing changed you are safe :). Your wallet is restored!",
                                                                                                    status: 200
                                                                                                })
                                                                                                break;
                                                                                            case 0:
                                                                                                res.status(400).json({
                                                                                                    error: true,
                                                                                                    message: "Please contact your admin ASAP. Something has gone wrong. You did not made a transaction but your wallet was deducted please make contact",
                                                                                                    status: 400
                                                                                                });
                                                                                                break;
                                                                                            default:
                                                                                        }
                                                                                    });
                                                                                }
                                                                            });
                                                                        }
                                                                    });
                                                                }
                                                            });
                                                            break;
                                                        case 3:
                                                            var InstQRY = 'INSERT INTO '+tran_card+' (userid, transaction_id, amount, created_at, reference_no) VALUES (?,?,?,?,?)';
                                                            const Param = [req._user[0].user_customers, result.insertId,body.amount,nowSeconds, body.reference_no];
                                                            config.MySQL.query(InstQRY, Param, function (err, crd_trans) {
                                                                if(err) throw err;
                                                                if(crd_trans.affectedRows > 0)
                                                                {
                                                                    res.status(201).json({
                                                                        message: 'Transaction successfully stored into database', status: 201
                                                                    })
                                                                }
                                                                else{
                                                                    var DELETE_QRY = 'DELETE FROM '+tbl+' WHERE SN = ?'; 
                                                                    config.MySQL.query(DELETE_QRY, [result.insertId], function (err, Del_trans) {
                                                                        if(err) throw err;
                                                                        if(Del_trans.affectedRows > 0)
                                                                        {
                                                                            config.MySQL.query(show_tbl, [req._user[0].user_customers], function (err, upgWallet) {
                                                                                if(err) throw err;
                                                                                console.log(upgWallet);
                                                                                if(upgWallet.length > 0)
                                                                                {
                                                                                    let a = upgWallet[0].Amount;
                                                                                    let b = body.amount
                                                                                    let C = a + b;
                                                                                    var update_tbll = "UPDATE "+tbl_wall+" set Amount = ? WHERE userid = ?";
                                                                                    config.MySQL.query(update_tbll, [C, req._user[0].user_customers], function (err, downWallet) {
                                                                                        if(err) throw err;
                                                                                        switch(downWallet.changedRows)
                                                                                        {
                                                                                            case 1:
                                                                                                res.status(200).json({
                                                                                                    message: "There was an error on the transaction. Nothing changed you are safe :). Your wallet is restored!",
                                                                                                    status: 200
                                                                                                })
                                                                                                break;
                                                                                            case 0:
                                                                                                res.status(400).json({
                                                                                                    error: true,
                                                                                                    message: "Please contact your admin ASAP. Something has gone wrong. You did not made a transaction but your wallet was deducted please make contact",
                                                                                                    status: 400
                                                                                                });
                                                                                                break;
                                                                                            default:
                                                                                        }
                                                                                    });
                                                                                }
                                                                            });
                                                                        }
                                                                    });
                                                                }
                                                            });
                                                            break;
                                                        default:
                                                    }
                                                    break;
                                                case 0:
                                                    res.status(200).json({
                                                        error: true, message: "Nothing happened", status: 200
                                                    })
                                                    break;
                                                default:
                                                    res.status(400).json({
                                                        error: true, message: "Error Occurred", status: 400
                                                    });
                                            }
                                        });
                                        
                                    }
                                }   
                            });
                            break;
                        case 3: //money transfer external users
                            config.MySQL.query(show_tbl, [req._user[0].user_customers], function (err, shoWallet) {
                                if(err) throw err;
                                if(shoWallet[0].Amount < body.amount){
                                    res.status(403).json({
                                        error: true,
                                        message: 'Your balance in the wallet is very low! You cannot make a transaction! Please recharge',
                                        status: 403
                                    })
                                }
                                else if(shoWallet[0].Amount >= body.amount) {
                                    config.MySQL.query(show_tbl, [req._user[0].user_customers], function (err, shoWallet) {
                                        if(err) throw err;
                                        var Amount = shoWallet[0].Amount - body.amount;
                                        var update_tbl = "UPDATE "+tbl_wall+" set Amount = ? WHERE userid = ?";
                                        config.MySQL.query(update_tbl, [Amount, req._user[0].user_customers], function (err, updWallet) {
                                            if(err) throw err;
                                            if(updWallet.changedRows > 0)
                                            {
                                                var reciverWallet = 'SELECT * FROM '+tbl_wall+' WHERE userid = ?';
                                                config.MySQL.query(reciverWallet, [rec], function (err, showRecWallet) {
                                                    if(err) throw err;
                                                    switch(showRecWallet.length)
                                                    {
                                                        case 0:
                                                            res.status(400).json({
                                                                error: true,
                                                                message: "Error! User has not yet created a wallet!",
                                                                status: 400
                                                            })
                                                            break;
                                                        default:
                                                            let x = showRecWallet[0].Amount;
                                                            let y = body.amount
                                                            let TransfetAmount = x + y;
                                                            var updateReciverWallet = "UPDATE "+tbl_wall+" set Amount = ? WHERE userid = ?";
                                                            config.MySQL.query(updateReciverWallet, [TransfetAmount, rec], function (err, recUpWal) {
                                                                if(err) throw err;
                                                                if(recUpWal.changedRows > 0){
                                                                    var notification = 'notifications';
                                                                    var tbl_notiy = 'INSERT INTO '+notification+' (user, message, redirect, created_at) VALUES (?,?,?,?,?)';
                                                                    var customer = 'SELECT name FROM users WHERE sn = ?';
                                                                    config.MySQL.query(customer, [req._user[0].user_customers], function (err, custName) {
                                                                        if(err) throw err;
                                                                        var msg = 'Greetings! '+custName[0].name+' has transfered '+body.amount+' to your wallet';
                                                                        config.MySQL.query(tbl_notiy, [rec, msg, 2, nowSeconds], function (err, recNotification) {
                                                                            if(err) throw err;
                                                                            if(recNotification.changedRows > 0){}
                                                                        });
                                                                    });
                                                                    switch(body.trans_type)
                                                                    {
                                                                        case 1:
                                                                            var InstQRY = 'INSERT INTO '+tran_paypal+' (user_id, transaction_id, amount, created_at) VALUES (?,?,?,?)';
                                                                            var Params = [req._user[0].user_customers, result.insertId,body.amount,nowSeconds];
                                                                            config.MySQL.query(InstQRY, Params, function (err, pay_trans) {
                                                                                if(err) throw err;
                                                                                if(pay_trans.affectedRows > 0)
                                                                                {
                                                                                    res.status(201).json({
                                                                                        message: 'Transaction successfully stored into database', status: 201
                                                                                    })
                                                                                }
                                                                                else{
                                                                                    var DELETE_QRY = 'DELETE FROM '+tbl+' WHERE SN = ?'; 
                                                                                    config.MySQL.query(DELETE_QRY, [result.insertId], function (err, Del_trans) {
                                                                                        if(err) throw err;
                                                                                        if(Del_trans.affectedRows > 0)
                                                                                        {
                                                                                            config.MySQL.query(show_tbl, [req._user[0].user_customers], function (err, upgWallet) {
                                                                                                if(err) throw err;
                                                                                                console.log(upgWallet);
                                                                                                if(upgWallet.length > 0)
                                                                                                {
                                                                                                    let a = upgWallet[0].Amount;
                                                                                                    let b = body.amount
                                                                                                    let C = a + b;
                                                                                                    var update_tbll = "UPDATE "+tbl_wall+" set Amount = ? WHERE userid = ?";
                                                                                                    config.MySQL.query(update_tbll, [C, req._user[0].user_customers], function (err, downWallet) {
                                                                                                        if(err) throw err;
                                                                                                        switch(downWallet.changedRows)
                                                                                                        {
                                                                                                            case 1:
                                                                                                                config.MySQL.query(show_tbl, [rec], function (err, downGradeWallet) {
                                                                                                                    if(err) throw err;
                                                                                                                    if(downGradeWallet.length > 0)
                                                                                                                    {
                                                                                                                        let a = upgWallet[0].Amount;
                                                                                                                        let b = body.amount
                                                                                                                        let C = a - b;
                                                                                                                        var update_tbll = "UPDATE "+tbl_wall+" set Amount = ? WHERE userid = ?";
                                                                                                                        config.MySQL.query(update_tbll, [C, rec], function (err, turndownWallet) {
                                                                                                                            if(err) throw err;
                                                                                                                            switch(turndownWallet.changedRows)
                                                                                                                            {
                                                                                                                                case 1:
                                                                                                                                    res.status(400).json({
                                                                                                                                        error: true,
                                                                                                                                        messsage: "There was an error on your transaction! The system has safely restored all transaction! Nothing changed :)",
                                                                                                                                        status: 400
                                                                                                                                    })
                                                                                                                                    break;
                                                                                                                                case 0:
                                                                                                                                    res.status(400).json({
                                                                                                                                        error: true,
                                                                                                                                        message: "Oops! Something went wrong please contact the admin ASAP :()",
                                                                                                                                        status: 400
                                                                                                                                    })
                                                                                                                                default:
                                                                                                                                    res.status(403).json({
                                                                                                                                        error: true,
                                                                                                                                        message: "A major error has occured please contact your admin to restore :()",
                                                                                                                                        status: 403
                                                                                                                                    })
                                                                                                                            }
                                                                                                                        });
                                                                                                                    }
                                                                                                                });
                                                                                                                break;
                                                                                                            case 0:
                                                                                                                res.status(400).json({
                                                                                                                    error: true,
                                                                                                                    message: "Please contact your admin ASAP. Something has gone wrong. You did not made a transaction but your wallet was deducted please make contact",
                                                                                                                    status: 400
                                                                                                                });
                                                                                                                break;
                                                                                                            default:
                                                                                                        }
                                                                                                    });
                                                                                                }
                                                                                            });
                                                                                        }
                                                                                    });
                                                                                }
                                                                            });
                                                                            break;
                                                                        case 2:
                                                                            var InstQRY = 'INSERT INTO '+tran_bank+' (userid, transaction_id, amount, created_at, reference_no) VALUES (?,?,?,?,?)';
                                                                            var Params = [req._user[0].user_customers, result.insertId,body.amount,nowSeconds, body.reference_no];
                                                                            config.MySQL.query(InstQRY, Params, function (err, bnk_trans) {
                                                                                if(err) throw err;
                                                                                if(bnk_trans.affectedRows > 0)
                                                                                {
                                                                                    res.status(201).json({
                                                                                        message: 'Transaction successfully stored into database', status: 201
                                                                                    })
                                                                                }
                                                                                else{
                                                                                    var DELETE_QRY = 'DELETE FROM '+tbl+' WHERE SN = ?'; 
                                                                                    config.MySQL.query(DELETE_QRY, [result.insertId], function (err, Del_trans) {
                                                                                        if(err) throw err;
                                                                                        if(Del_trans.affectedRows > 0)
                                                                                        {
                                                                                            config.MySQL.query(show_tbl, [req._user[0].user_customers], function (err, upgWallet) {
                                                                                                if(err) throw err;
                                                                                                console.log(upgWallet);
                                                                                                if(upgWallet.length > 0)
                                                                                                {
                                                                                                    let a = upgWallet[0].Amount;
                                                                                                    let b = body.amount
                                                                                                    let C = a + b;
                                                                                                    var update_tbll = "UPDATE "+tbl_wall+" set Amount = ? WHERE userid = ?";
                                                                                                    config.MySQL.query(update_tbll, [C, req._user[0].user_customers], function (err, downWallet) {
                                                                                                        if(err) throw err;
                                                                                                        switch(downWallet.changedRows)
                                                                                                        {
                                                                                                            case 1:
                                                                                                                config.MySQL.query(show_tbl, [rec], function (err, downGradeWallet) {
                                                                                                                    if(err) throw err;
                                                                                                                    if(downGradeWallet.length > 0)
                                                                                                                    {
                                                                                                                        let a = upgWallet[0].Amount;
                                                                                                                        let b = body.amount
                                                                                                                        let C = a - b;
                                                                                                                        var update_tbll = "UPDATE "+tbl_wall+" set Amount = ? WHERE userid = ?";
                                                                                                                        config.MySQL.query(update_tbll, [C, rec], function (err, turndownWallet) {
                                                                                                                            if(err) throw err;
                                                                                                                            switch(turndownWallet.changedRows)
                                                                                                                            {
                                                                                                                                case 1:
                                                                                                                                    res.status(400).json({
                                                                                                                                        error: true,
                                                                                                                                        messsage: "There was an error on your transaction! The system has safely restored all transaction! Nothing changed :)",
                                                                                                                                        status: 400
                                                                                                                                    })
                                                                                                                                    break;
                                                                                                                                case 0:
                                                                                                                                    res.status(400).json({
                                                                                                                                        error: true,
                                                                                                                                        message: "Oops! Something went wrong please contact the admin ASAP :()",
                                                                                                                                        status: 400
                                                                                                                                    })
                                                                                                                                default:
                                                                                                                                    res.status(403).json({
                                                                                                                                        error: true,
                                                                                                                                        message: "A major error has occured please contact your admin to restore :()",
                                                                                                                                        status: 403
                                                                                                                                    })
                                                                                                                            }
                                                                                                                        });
                                                                                                                    }
                                                                                                                });
                                                                                                                break;
                                                                                                            case 0:
                                                                                                                res.status(400).json({
                                                                                                                    error: true,
                                                                                                                    message: "Please contact your admin ASAP. Something has gone wrong. You did not made a transaction but your wallet was deducted please make contact",
                                                                                                                    status: 400
                                                                                                                });
                                                                                                                break;
                                                                                                            default:
                                                                                                        }
                                                                                                    });
                                                                                                }
                                                                                            });
                                                                                        }
                                                                                    });
                                                                                }
                                                                            });
                                                                            break;
                                                                        case 3:
                                                                            var InstQRY = 'INSERT INTO '+tran_card+' (userid, transaction_id, amount, created_at, reference_no) VALUES (?,?,?,?,?)';
                                                                            var Params = [req._user[0].user_customers, result.insertId,body.amount,nowSeconds, body.reference_no];
                                                                            config.MySQL.query(InstQRY, Params, function (err, crd_trans) {
                                                                                if(err) throw err;
                                                                                if(crd_trans.affectedRows > 0)
                                                                                {
                                                                                    res.status(201).json({
                                                                                        message: 'Transaction successfully stored into database', status: 201
                                                                                    })
                                                                                }
                                                                                else{
                                                                                    var DELETE_QRY = 'DELETE FROM '+tbl+' WHERE SN = ?'; 
                                                                                    config.MySQL.query(DELETE_QRY, [result.insertId], function (err, Del_trans) {
                                                                                        if(err) throw err;
                                                                                        if(Del_trans.affectedRows > 0)
                                                                                        {
                                                                                            config.MySQL.query(show_tbl, [req._user[0].user_customers], function (err, upgWallet) {
                                                                                                if(err) throw err;
                                                                                                console.log(upgWallet);
                                                                                                if(upgWallet.length > 0)
                                                                                                {
                                                                                                    let a = upgWallet[0].Amount;
                                                                                                    let b = body.amount
                                                                                                    let C = a + b;
                                                                                                    var update_tbll = "UPDATE "+tbl_wall+" set Amount = ? WHERE userid = ?";
                                                                                                    config.MySQL.query(update_tbll, [C, req._user[0].user_customers], function (err, downWallet) {
                                                                                                        if(err) throw err;
                                                                                                        switch(downWallet.changedRows)
                                                                                                        {
                                                                                                            case 1:
                                                                                                                config.MySQL.query(show_tbl, [rec], function (err, downGradeWallet) {
                                                                                                                    if(err) throw err;
                                                                                                                    if(downGradeWallet.length > 0)
                                                                                                                    {
                                                                                                                        let a = upgWallet[0].Amount;
                                                                                                                        let b = body.amount
                                                                                                                        let C = a - b;
                                                                                                                        var update_tbll = "UPDATE "+tbl_wall+" set Amount = ? WHERE userid = ?";
                                                                                                                        config.MySQL.query(update_tbll, [C, rec], function (err, turndownWallet) {
                                                                                                                            if(err) throw err;
                                                                                                                            switch(turndownWallet.changedRows)
                                                                                                                            {
                                                                                                                                case 1:
                                                                                                                                    res.status(400).json({
                                                                                                                                        error: true,
                                                                                                                                        messsage: "There was an error on your transaction! The system has safely restored all transaction! Nothing changed :)",
                                                                                                                                        status: 400
                                                                                                                                    })
                                                                                                                                    break;
                                                                                                                                case 0:
                                                                                                                                    res.status(400).json({
                                                                                                                                        error: true,
                                                                                                                                        message: "Oops! Something went wrong please contact the admin ASAP :()",
                                                                                                                                        status: 400
                                                                                                                                    })
                                                                                                                                default:
                                                                                                                                    res.status(403).json({
                                                                                                                                        error: true,
                                                                                                                                        message: "A major error has occured please contact your admin to restore :()",
                                                                                                                                        status: 403
                                                                                                                                    })
                                                                                                                            }
                                                                                                                        });
                                                                                                                    }
                                                                                                                });
                                                                                                                break;
                                                                                                            case 0:
                                                                                                                res.status(400).json({
                                                                                                                    error: true,
                                                                                                                    message: "Please contact your admin ASAP. Something has gone wrong. You did not made a transaction but your wallet was deducted please make contact",
                                                                                                                    status: 400
                                                                                                                });
                                                                                                                break;
                                                                                                            default:
                                                                                                        }
                                                                                                    });
                                                                                                }
                                                                                            });
                                                                                        }
                                                                                    });
                                                                                }
                                                                            });
                                                                            break;
                                                                        default:
                                                                    }
                                                                    
                                                                }
                                                                else{
                                                                    res.status(400).json({
                                                                        error: true, message: "Something went wrong nothing update", status: 400
                                                                    })
                                                                }
                                                            });
                                                    }
                                                });
                                            }
                                        });
                                    });
                                }
                            });
                            break;
                        default:
                    }
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

exports.fetchOne = function fetchOne(req, res, next) {
    var sn = req.doc.sn;
    var tbl = 'transaction_history';
    var show_tbl = 'SELECT * FROM `'+tbl+'` WHERE `sn` = ?';
    config.MySQL.query(show_tbl, [sn], function (err, result) {
        if(err) throw err;
        switch(result.length)
        {
        case 1:
            res.status(200);
            res.json(result);
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

exports.fetchAll = function fetchAll(req, res, next) {
    var tbl_name = 'transaction_history';
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

exports.getPayment = function getPayment(req, res, next) {
    var sn = req._user[0].user_customers;
    var tbl = 'transaction_history';
    var tbl_customer = 'users';
    var show_tbl = 'SELECT * FROM `'+tbl+'` WHERE `user_id` = ?';
    var show_customers = 'SELECT * FROM `'+tbl_customer+'` WHERE `sn` = ?';
    var Param = [sn];
    config.MySQL.query(show_customers, Param, function (err, result) {
        if(err) throw err;
        switch(result.length)
        {
            case 1:
                config.MySQL.query(show_tbl, Param, function (err, results) {
                    if(err) throw err;
                    if(results.length > 0)
                    {
                        res.status(200).json(results)
                    }
                    else{
                        res.status(404).json({
                            error: true, message: "You don't have any transaction yet", status: 404
                        })
                    }
                });
                break;
            case 0:
                res.status(400);
                res.json({
                error: true, message: "You Are unauthorized", error_name: err, status: 400
                });
                break;
            default:
        }
    });
};

/** display payment with pending paid that is activated */
exports.getPendingPayments = function getPendingPayments(req, res, next) {
    var query = {
        paid: false
    };
    paymentDal.getCollection(query, {}, (err, docs) => {
        if (err) {
            return next(err);
        }
        res.json(docs);
    });
};



exports.update = function update(req, res, next) {
    var body = req.body;
    var sn = req.doc.sn;
    var tbl = 'transaction_history';
    var show_tbl = "UPDATE "+tbl+" set user_id = ?, amount = ?, type = ?, extra_info =? WHERE sn = ?";
    config.MySQL.query(show_tbl, [body.user, body.amount, body.type, body.extra_info, sn], function (err, result) {
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

exports.deletepayment = (req, res, next) => {
    var sn = req.doc.sn;
    var tbl = 'transaction_history';
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
                error: true,
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