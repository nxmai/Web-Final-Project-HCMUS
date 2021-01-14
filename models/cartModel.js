const db = require('../dal/mysql');

exports.addCart = async (cart, userId) => {
    //console.log('cart in model', typeof(parseInt(cart.totalPrice)));
    const newCart = {
        userId: userId,
        totalPrice: parseInt(cart.totalPrice),
        totalQuantity: parseInt(cart.totalQuantity)
    }

    await db.add("INSERT INTO Cart SET ?", newCart);

    let cartId = await db.load(`select max(cartId) as cartId from Cart;`);
    cartId = cartId[0].cartId;
    
    var newItemInCart;
    
    for (i in cart.items ){
        newItemInCart = {
            itemId: i,
            amount: cart.items[i].quantity,
            price: cart.items[i].price,
            cartId: cartId
        }
        await db.add("INSERT INTO ItemInCart SET ?", newItemInCart);
    }
    
    return cartId;
}