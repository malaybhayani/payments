var express   = require('express');
var bankController = require('../controllers/customer');
var authController = require('../controllers/auth');
var accessControl  = require('../controllers/auth').accessControl;
var accessPermission = require('../controllers/customer').accessPermission;
var router  = express.Router();

router.get('/', accessControl(['super_admin']), bankController.fetchAll);
router.get('/profile', accessPermission(['customer','merchant']), bankController.profileCustomer);
router.get('/logout', authController.logout);
router.get('/checkToken', authController.checkToken);
router.get('/transaction', accessPermission(['customer','merchant']), bankController.getTransaction);
router.get('/:id', bankController.fetchOne);
router.post('/signup', bankController.create);
router.post('/login', bankController.authenticateUser);
router.post('/search', accessControl(['super_admin']), bankController.searchCustomer);
router.post('/document/update', accessControl(['admin', 'super_admin','helper']), bankController.docUpdate);
router.param('id', bankController.validatebank);
router.put('/update_profile',accessPermission(['customer','merchant']), bankController.updateProfile);
router.put('/update_password',accessPermission(['customer','merchant']), bankController.updatePassword);
router.put('/:id', accessControl(['super_admin']), bankController.update);
router.delete('/:id', accessControl(['admin', 'super_admin']), bankController.deletebank);

// Expose User Router
module.exports = router;
