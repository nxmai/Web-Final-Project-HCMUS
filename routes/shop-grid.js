const express = require('express');
const router = express.Router();
const shopgridController = require('../controllers/shopgridController');

/*GET list of devices */
router.get('/', shopgridController.index);

module.exports = router;