var express   = require('express');
var BankController = require('../controllers/banks');
var accessControl  = require('../controllers/auth').accessControl;
var accessPermission = require('../controllers/customer').accessPermission;
var router  = express.Router();
router.get('/',accessControl(['admin', 'super_admin','helper','customers']), BankController.fetchAll);
router.get('/customers', accessPermission(['customers','merchant']), BankController.fetchUser);
router.get('/:id',accessControl(['admin', 'super_admin']), BankController.fetchOne);
router.post('/', accessPermission(['customer', 'merchant']), BankController.create);
router.param('id', BankController.validatebank);
router.put('/update', accessPermission(['merchant', 'customer']), BankController.updateBank);
router.put('/:id', accessControl(['admin', 'super_admin']), BankController.update);
router.delete('/remove', accessPermission(['merchant', 'customer']), BankController.removeBank);
router.delete('/:id', accessControl(['admin', 'super_admin']), BankController.deleteBank);

// Expose User Router
module.exports = router;
