const shopgridModel = require('../models/shopgridModel');

exports.index = (req, res, next) => {
    //get list shop grid from model
    const product = shopgridModel.list();
    const logo_image = shopgridModel.list_logo_image();
    //pass data to view display
    res.render('index', { product, logo_image });
}

exports.details = async (req, res, next) => {
    
    res.render('single-product', await shopgridModel.get(req.params.id));
}

exports.singleProduct = (req, res, next) => {
    res.render('single-product');

}