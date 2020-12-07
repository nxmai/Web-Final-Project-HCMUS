const shopgridModel = require('../models/shopgridModel');

exports.index = async  (req, res, next) => {
    const page = +req.query.page || 1;
    const categoryId = req.query.category;
    const shopgrid = await shopgridModel.list.all(categoryId, page);
    const category = await shopgridModel.list.category();
    


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