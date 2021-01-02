const { request } = require('express');
var express = require('express');
var router = express.Router();
const productController = require('../controllers/productController');

router.get('/', productController.singleProduct);
router.get('/:id/comment', productController.details);
router.post('/:id/comment', productController.add);
router.get('/:id', productController.details);


// router.get('/:id', (req, res) => {
//     res.render('single-product');
// })

// router.get('/', (req, res) => {
//     console.log('ra day');
//     res.render('single-product');
// })

//console.log('product.js');

module.exports = router;