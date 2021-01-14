const express = require('express');
const router = express.Router();
const { isAuth } = require('../middleware/auth');
const cartApiController = require('../controllers/api/cartController');

router.get('/', async (req, res) => {
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
    return res.json(cartItem);
})

router.delete('/', (req, res) => {
    const productId = req.body.id;
    req.session.cart.remove(productId);

    res.json({
        totalQuantity: req.session.cart.totalQuantity,
        totalPrice: req.session.cart.totalPrice
    });
})

router.get('/checkout', isAuth, async (req, res) => {
    const cart = req.session.cart;
    res.locals.checkOut = true;
    res.locals.cart = cart.getCart();

    // if(res.locals.checkOut){
    //     res.locals.cartId = await cartApiController.addCart(cart, res.locals.user.id);
    // }

    res.render('checkout');
})

router.post('/checkout', async (req, res) => {
    const {firstname, lastname, phonenumber, address} = req.body;
    const cart = req.session.cart;
    res.locals.cart = cart.getCart();
    await cartApiController.addCart(cart, res.locals.user.id, firstname, lastname, phonenumber, address);

    res.render('checkout');
})

module.exports = router;