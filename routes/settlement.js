var express   = require('express');
var settleController = require('../controllers/settlement');
var accessControl  = require('../controllers/auth').accessControl;
var accessPermission = require('../controllers/customer').accessPermission;
var router  = express.Router();
router.get('/:id', settleController.fetchOne);
router.get('/', settleController.fetchAll);
router.post('/', accessPermission(['customer', 'merchant']), settleController.create);
router.param('id', settleController.validatesettle);
router.put('/:id', settleController.update);
router.delete('/:id', accessControl(['admin', 'super_admin']), settleController.deletesettle);

// Expose User Router
module.exports = router;
