const db = require('../dal/mysql');

exports.addCart = async (cart, userId, firstname, lastname, phonenumber, address) => {
    //console.log('cart in model', typeof(parseInt(cart.totalPrice)));
    const newCart = {
        userId: userId,
        totalPrice: parseInt(cart.totalPrice),
        totalQuantity: parseInt(cart.totalQuantity),
        firstname: firstname,
        lastname: lastname,
        phonenumber: phonenumber,
        address: address,
        createDate: NOW()
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
    
    return;
}

exports.getListCart = async (id) => {
    const sql = `select * from Cart where userId = ${id}`;
    const listcart = await db.load(sql);
    return listcart;
}

exports.getCartItem = async (cartId) => {
    const sql = `select p.id as id, p.thumbnailPath, p.name, p.price as price, i.amount as quantity, 
    i.price as totalPrice from Product as p join ItemInCart as i on p.id = i .itemId where cartId = ${cartId};`;
    const cart = await db.load(sql);
    return cart;
}

exports.getCart = async(cartId) => {
    const sql = `select totalPrice, totalQuantity from Cart where cartId = ${cartId}`

    const cart = await db.load(sql);
    return cart;
}

exports.getSatus = async (cartId) => {
    const sql = `select status from Cart where cartId = ${cartId}`

    const status = await db.load(sql);
    return status[0].status;
}