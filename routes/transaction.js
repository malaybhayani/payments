var express   = require('express');
var paymentController = require('../controllers/transaction');
var accessControl  = require('../controllers/auth').accessControl;
var accessPermission = require('../controllers/customer').accessPermission;
var router  = express.Router();
router.get('/customers',accessPermission(['customer', 'merchant']), paymentController.getPayment);
router.get('/',accessControl(['super_admin']), paymentController.fetchAll);
router.get('/:id', paymentController.fetchOne);
router.param('id', paymentController.validatepayment);
router.post('/', accessPermission(['customer', 'merchant']), paymentController.create);
router.put('/:id', accessControl(['admin', 'super_admin']), paymentController.update);
router.delete('/:id', accessControl(['admin', 'super_admin']), paymentController.deletepayment);

// Expose User Router
module.exports = router;
