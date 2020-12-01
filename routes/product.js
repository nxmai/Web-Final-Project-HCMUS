var express = require('express');
var router = express.Router();
const productController = require('../controllers/productController');

router.get('/', productController.singleProduct);
router.get('/:id', productController.details);
console.log('product.js');

module.exports = router;