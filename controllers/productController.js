const productModel = require('../models/productModel');
var cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: 'kylecloudy',
    api_key: '117882282768667',
    api_secret: 'PMJ0PmowbNRSyPJCQM6HVtSSAgA'
});

exports.index = async (req, res, next) => {
    const product = await productModel.list.getBestSeller();

    for (item of product) {
        //item.imagePath = cloudinary.url(item.imagePath);
        item.imagePath = cloudinary.url(item.imagePath, { width: 290, height: 290, crop: "scale" })
    }
    //console.log('index', product);
    res.render('index', { product });
}

exports.getById = (id) => {
    const product = productModel.list.getById(id);

    return product;
}

exports.details = async (req, res, next) => {
    try {

        const totalCmt = await productModel.list.countAllComment(req.params.id);
        const nPages = Math.ceil(totalCmt / 3);
        const page = +req.query.page || 1;
        const page_items = [];
        for (var i = 1; i <= nPages; i++) {
            const item = {
                value: i
            }
            page_items.push(item);
        }

        if (req.query.page !== undefined) {
            const comment = await productModel.list.comment(req.params.id, page);

            res.render('ajaxSnippets/comment', {
                layout: false, comment,
                page_items, page, nPages,
                next_page: page + 1,
                prev_page: page - 1,
                can_go_next: page < nPages,
                can_go_prev: page > 1
            });
        }
        else {
            const product = await productModel.list.single(req.params.id);
            const specification = await productModel.list.specification(req.params.id);
            const comment = await productModel.list.comment(req.params.id, page);
            const cate = await productModel.list.getCateById(req.params.id);
            const related = await productModel.list.getRelated(cate);

            for (item of related) {
                item.imagePath = cloudinary.url(item.imagePath, { width: 290, height: 290, crop: "scale" });
            }

            for (item of product) {
                //item.imagePath = cloudinary.url(item.imagePath);
                item.imagePath = cloudinary.url(item.imagePath);
            }
            //product.imagePath = cloudinary.url(product.imagePath, { width: 290, height: 290, crop: "scale" })

            res.render('single-product', {
                product, specification, comment, related,
                page_items, page, nPages,
                next_page: page + 1,
                prev_page: page - 1,
                can_go_next: page < nPages,
                can_go_prev: page > 1
            });
        }

    } catch (err) {
        console.log(err);
        res.send('Check error on server \'s console ');
    }
}

exports.singleProduct = (req, res, next) => {
    res.render('single-product');
}

exports.add = async (req, res) => {
    await productModel.list.add(req.body);

    const totalCmt = await productModel.list.countAllComment(req.params.id);

    const nPages = Math.ceil(totalCmt / 3);
    const page = +req.query.page || 1;
    const page_items = [];
    for (var i = 1; i <= nPages; i++) {
        const item = {
            value: i
        }
        page_items.push(item);
    }
    const comment = await productModel.list.comment(req.params.id, page);

    // res.render('ajaxSnippets/comment', {
    //                                     layout: false, comment,
    //                                     page_items, page, nPages,
    //                                     next_page: page + 1,
    //                                     prev_page: page - 1,
    //                                     can_go_next: page < nPages,
    //                                     can_go_prev: page > 1
    // });

    const product = await productModel.list.single(req.params.id);
    const specification = await productModel.list.specification(req.params.id);
    const cate = await productModel.list.getCateById(req.params.id);
    const related = await productModel.list.getRelated(cate);

    for (item of related) {
        item.imagePath = cloudinary.url(item.imagePath, { width: 290, height: 290, crop: "scale" });
    }

    for (item of product) {
        //item.imagePath = cloudinary.url(item.imagePath);
        item.imagePath = cloudinary.url(item.imagePath);
    }

    res.render('single-product', {
        product, specification, comment,
        page_items, page, nPages,
        next_page: page + 1,
        prev_page: page - 1,
        can_go_next: page < nPages,
        can_go_prev: page > 1
    });

}
