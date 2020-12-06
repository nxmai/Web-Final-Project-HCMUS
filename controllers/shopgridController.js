const shopgridModel = require('../models/shopgridModel');

exports.index = async  (req, res, next) => {
    const shopgrid = await shopgridModel.list.all();
    //console.log(shopgrid);
    res.render('shop-grid', { shopgrid }); 

    // try{
    //     const shopgrid = await shopgridModel.list.all();
    //     console.log(shopgrid);
    //     res.render('shop-grid', { shopgrid }); 
    // }catch (err) {
    //     console.log(err);
    //     res.send('Check error on server \'s console ');
    // }

}