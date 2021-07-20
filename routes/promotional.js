var express   = require('express');
var LecturerController = require('../controllers/promotional');
var accessControl  = require('../controllers/auth').accessControl;

var router  = express.Router();
router.get('/', accessControl(['banner','super_admin']), LecturerController.fetchAll);
router.get('/:id', accessControl(['banner','super_admin']), LecturerController.fetchOne);
router.post('/', accessControl(['banner','super_admin']), LecturerController.create);
router.put('/:id', accessControl(['banner','super_admin']), LecturerController.update);
router.put('/update_image/:id', accessControl(['banner','super_admin']), LecturerController.updateImg);
router.param('id', LecturerController.validateLecture);
router.delete('/:id', accessControl(['banner','super_admin']), LecturerController.deleteLecture);

// Expose User Router
module.exports = router;