const shopgridModel = require('../models/shopgridModel');

exports.index = (req, res, next) => {
    res.render('index');
}

exports.details = async (req, res, next) => {
    try {
        const product = await shopgridModel.list.single(req.params.id);
        const specification = await shopgridModel.list.specification(req.params.id);
        console.log(specification);
        res.render('single-product', {product: product, specification: specification});
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