const cartModel = require('../../models/cartModel');

exports.addCart = async (cart, userId) => {
    const cartId = await cartModel.addCart(cart, userId);
    return cartId;
}