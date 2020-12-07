const shopgridModel = require('../models/shopgridModel');

exports.index = async  (req, res, next) => {
    const shopgrid = await shopgridModel.list.all(req.query.category);
    const category = await shopgridModel.list.category();
    //console.log(category);
    res.render('shop-grid', { shopgrid, category}); 

    // try{
    //     const shopgrid = await shopgridModel.list.all();
    //     console.log(shopgrid);
    //     res.render('shop-grid', { shopgrid }); 
    // }catch (err) {
    //     console.log(err);
    //     res.send('Check error on server \'s console ');
    // }

}