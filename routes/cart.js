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
        const cartItem = req.session.cart.add(product, productId, quantity);
        return res.json(cartItem);
        
    })
    .catch(error => next(error));
});
//{state: "success", totalQuantity: req.session.cart.totalQuantity()}

router.put('/', (req, res) => {
    const productId = req.body.id;
    const quantity = req.body.quantity;
    const cartItem = req.session.cart.update(productId, quantity);
    console.log('cartitem', cartItem);
    console.log('cartitem item', cartItem.item);
    console.log('cartitem.item.item[].price', cartItem.item.price);
    return res.json(cartItem);
})

module.exports = router;