const productModel = require('../models/productModel');

exports.index = (req, res, next) => {
    res.render('index');
}

exports.details = async (req, res, next) => {
    try {
        const product = await productModel.list.single(req.params.id);
        const specification = await productModel.list.specification(req.params.id);
        res.locals.product = product;
        res.locals.specification = specification;
        res.render('single-product');
    }catch (err) {
        console.log(err);
        res.send('Check error on server \'s console ');
    }


}

exports.singleProduct = (req, res, next) => {
    res.render('single-product');
}