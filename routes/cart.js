const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    const cart = req.session.cart;
    res.locals.cart = cart.getCart();
    res.render('cart');
});

router.post('/', (req, res, next) => {
    const productId = req.body.id;
    console.log('product idddd', productId);
    const quantity = isNaN(req.body.quantity) ? 1 : req.body.quantity;
    const productController = require('../controllers/productController');
    productController
    .getById(productId)
    .then(product => {
        const cartItem = req.session.cart.add(product, productId, quantity);
        //console.log('product', product);
        //console.log('product id', productId);
        //console.log('quantity', quantity);
        //console.log('cart item', cartItem);
        return res.json(cartItem);
        
    })
    .catch(error => next(error));
});
//{state: "success", totalQuantity: req.session.cart.totalQuantity()}
module.exports = router;