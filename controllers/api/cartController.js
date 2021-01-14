const cartModel = require('../../models/cartModel');

exports.addCart = async (cart, userId, firstname, lastname, phonenumber, address) => {
    await cartModel.addCart(cart, userId, firstname, lastname, phonenumber, address);
    return;
}
