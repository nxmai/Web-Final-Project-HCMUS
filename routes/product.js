var express = require('express');
var router = express.Router();
const productController = require('../controllers/productController');

router.get('./:id', (req, res) => {
    

    res.render('single-product');
})

module.exports = router;