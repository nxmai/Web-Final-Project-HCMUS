var express = require('express');
var router = express.Router();
const registerController = require('../controllers/registerController');

router.post('/', registerController.index);
router.get('/', registerController.index);

module.exports = router;