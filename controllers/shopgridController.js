const shopgridModel = require('../models/shopgridModel');

exports.index = async  (req, res, next) => {
    try{
        const shopgrid = await shopgridModel.list.all();
        console.log(shopgrid);
        res.render('shop-grid', { shopgrid });
    }catch (err) {
        console.log(err);
        res.send('Check error on server \'s console ');
    }

    //res.render('shop-grid');


    //get list shop grid from model
    //const shopgrid = shopgridModel.list();
    //pass data to view display
    //console.log(shopgrid);
    //res.render('shop-grid', {shopgrid});
}