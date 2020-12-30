const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    const cart = req.session.cart;
    res.locals.cart = cart.getCart();
    res.render('cart');
});

router.post('/', (req, res, next) => {
    const productId = req.body.id;
    const quantity = isNaN(req.body.quantity) ? 1 : req.body.quantity;
    const productController = require('../controllers/productController');
    productController
    .getById(productId)
    .then(product => {
        console.log('product', product);
        req.session.cart.add(product, productId, quantity);
        return res.json({state: "success", totalQuantity: req.session.cart.totalQuantity()});
        
    })
    .catch(error => next(error));
});

module.exports = router;