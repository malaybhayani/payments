var express   = require('express');
var MerchantController = require('../controllers/merchant_link');
var accessControl  = require('../controllers/auth').accessControl;
var accessPermission = require('../controllers/customer').accessPermission
var router  = express.Router();
router.get('/', MerchantController.fetchAll);
router.get('/showLists', accessPermission(['merchant']), MerchantController.showLists);
router.get('/:id', MerchantController.fetchOne);
router.post('/', accessPermission(['customer']), MerchantController.create);
router.param('id', MerchantController.validateMerchant);
router.put('/:id', accessControl(['admin', 'super_admin','helper']), MerchantController.update);
router.delete('/:id', accessControl(['admin', 'super_admin']), MerchantController.deleteMerchant);

// Expose User Router
module.exports = router;
