const shopgridModel = require('../models/shopgridModel');

exports.index = (req, res, next) => {
    //get list shop grid from model
    const product = shopgridModel.list();
    const logo_image = shopgridModel.list_logo_image();
    //pass data to view display
    res.render('index', { product, logo_image });
}

exports.details = async (req, res, next) => {
    const single = await shopgridModel.get(req.params.id);
    
    res.render('single-product', {single});
}

exports.singleProduct = (req, res, next) => {
    const single = shopgridModel.single();
    
    res.render('single-product', {single});

}