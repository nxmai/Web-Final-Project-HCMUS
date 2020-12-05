const shopgridModel = require('../models/shopgridModel');

exports.index = (req, res, next) => {
    




    //get list shop grid from model
    const shopgrid = shopgridModel.list();
    //pass data to view display
    res.render('shop-grid', {shopgrid});
}