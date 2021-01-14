const cartModel = require('../../models/cartModel');

exports.addCart = async (cart, userId, firstname, lastname, phonenumber, address) => {
    await cartModel.addCart(cart, userId, firstname, lastname, phonenumber, address);
    return;
}

exports.getListCart = async(req, res) => {
    const userId= res.locals.user.id;

    const listcart = await cartModel.getListCart(userId);

    res.render('listOrder', {listcart});
}

exports.getCart = async(req, res) => {
    const cartId = req.params.cartId;

    const cartitem = await cartModel.getCartItem(cartId);
    const cart = await cartModel.getCart(cartId);
    const status = await cartModel.getSatus(cartId);

    res.render('viewcart', {cartitem, cart, status});
}
