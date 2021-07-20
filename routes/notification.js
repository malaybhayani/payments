var express   = require('express');
var NotiticationRequestController = require('../controllers/notification');
var accessControl  = require('../controllers/auth').accessControl;
var accessPermission = require('../controllers/customer').accessPermission;
var router  = express.Router();
router.get('/', accessControl(['admin', 'super_admin']),NotiticationRequestController.fetchAll);
router.get('/lists', accessPermission(['customer','merchant']), NotiticationRequestController.users);
router.get('/:id', NotiticationRequestController.fetchOne);
router.post('/', accessControl(['admin', 'super_admin']), NotiticationRequestController.create);
router.put('/:id', accessControl(['admin', 'super_admin']), NotiticationRequestController.update);
router.param('id', NotiticationRequestController.validateNotifi);
router.delete('/:id', accessControl(['admin', 'super_admin']), NotiticationRequestController.deleteNotifi);

// Expose User Router
module.exports = router;
