var express   = require('express');
var EmailController = require('../controllers/content');
var accessControl  = require('../controllers/auth').accessControl;

var router  = express.Router();
router.get('/', EmailController.fetchAll);
router.get('/:id', EmailController.fetchOne);
router.post('/', accessControl(['content', 'super_admin']), EmailController.create);
router.param('id', EmailController.validateEmail);
router.put('/:id', accessControl(['content', 'super_admin']), EmailController.update);
router.delete('/:id', accessControl(['content', 'super_admin']), EmailController.deleteEmail);

// Expose User Router
module.exports = router;
