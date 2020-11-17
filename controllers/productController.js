const shopgridModel = require('../models/shopgridModel');

exports.index = (req, res, next) => {
    //get list shop grid from model
    const product = shopgridModel.list();
    //pass data to view display
    res.render('index', {product});
}