const shopgridModel = require('../models/shopgridModel');

exports.index = (req, res, next) => {
    //get list shop grid from model
    //const product = shopgridModel.list();
    //const logo_image = shopgridModel.list_logo_image();
    //pass data to view display
    //res.render('index', { product, logo_image });
    res.render('index');
}

exports.details = async (req, res, next) => {
    try {
        const product = await shopgridModel.list.single(req.params.id);
        //console.log(product);
        res.render('single-product', {product: product});
    }catch (err) {
        console.log(err);
        res.send('Check error on server \'s console ');
    }


    // const single = await shopgridModel.get(req.params.id);
    
    // res.render('single-product', {single});
}

exports.singleProduct = (req, res, next) => {
    res.render('single-product');
}