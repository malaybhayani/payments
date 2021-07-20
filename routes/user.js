var express   = require('express');
var debug     = require('debug')('api:user-router'); //identify and remove errors
var authController = require('../controllers/auth');
var userController = require('../controllers/user');
var accessControl  = require('../controllers/auth').accessControl;

var router  = express.Router();

router.get('/active', userController.sendEmail1);
router.get('/', userController.getUserInfo);
router.get('/all',accessControl(['admin', 'super_admin']),userController.allUsers);
router.get('/logout', authController.logout);
router.get('/:id', accessControl(['admin', 'super_admin']), userController.getUser);
router.post('/login', authController.login);
router.post('/signup', accessControl(['super_admin']), userController.createUser);
router.post('/reset', userController.resetPhonePass);
router.post('/password/forgot_password', userController.forgotPassword);

router.param('id',userController.validateUser);
router.put('/:id', accessControl(['admin', 'super_admin']), userController.updateUser);
router.put('/password/update', userController.passwordChange);
router.delete('/:id', accessControl(['super_admin']), userController.removeUser);
module.exports = router;