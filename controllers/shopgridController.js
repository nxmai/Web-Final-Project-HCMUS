const shopgridModel = require('../models/shopgridModel');

exports.index = async  (req, res, next) => {
    //const page = +req.query.page || 1;
    const query = req.query;
    console.log(query);
    const shopgrid = await shopgridModel.list.getAll(query);
    const category = await shopgridModel.list.category();
    console.log(shopgrid);
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