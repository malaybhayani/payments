var debug = require('debug')('api:routes');
var pkg                   = require('../package.json');
var userController        = require('./user');
var NotifiRouter               = require('./notification');
var bankRouter                 = require('./customer');
var paymentRouter                     = require('./transaction');
var lecturerRouter                     = require('./promotional');
var walletRouter = require('./wallet');
var settleRouter = require('./settlement');
var BankRouter  = require('./banks')
var emailRouter = require('./content');
var merchantRouter = require('./merchant_link');
var config                     = require('../config');

/**
 * accessControl is for internal users meaning the admin
 * accessPermission is for the external users meanig the customers and merchants
 */

module.exports = function (app) {
   // this is for the individual_employer
  app.use('/api/transaction', paymentRouter);
  app.use('/api/notification', NotifiRouter);
  app.use('/api/users', userController);
  app.use('/api/customers', bankRouter);  
  app.use('/api/content', emailRouter);
  app.use('/api/promo', lecturerRouter);
  app.use('/api/banks', BankRouter);
  app.use('/api/wallets',walletRouter);
  app.use('/api/settlement',settleRouter);
  app.use('/api/merchant_links',merchantRouter);
  app.get('/', function (req, res) {
    res.json({
      name:       pkg.name,
      version:    pkg.version,
      description: pkg.description,
      documentation: config.DOCS_URL,
      uptime: process.uptime() + 's'
    });
  });

  debug('routes loaded');
};

// OPEN ENDPOINTS
module.exports.OPEN_ENDPOINTS = [
    /\/media\/.*/,
    /\/documentation\/.*/,
    /\/profilePicByAdmin\/.*/,
    /\/guaranteeDocbyAdmin\/.*/,
    /\/helperIDbyAdmin\/.*/,
    /\/otherDocbyAdmin\/.*/,
    '/api/users/login',
    '/api/users/password/forgot_password',
    '/api/users/reset',
    '/api/customers/signup',
    '/api/customers/login',
    '/'
];