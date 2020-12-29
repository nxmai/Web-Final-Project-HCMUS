const productModel = require('../models/productModel');

exports.index = (req, res, next) => {
    res.render('index');
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

            res.render('ajaxSnippets/comment', { layout: false, comment,
                                                        page_items, page, nPages,
                                                        next_page: page +1,
                                                        prev_page: page - 1,
                                                        can_go_next: page < nPages,
                                                        can_go_prev: page > 1 });
           

        }
        else {
            const product = await productModel.list.single(req.params.id);
            const specification = await productModel.list.specification(req.params.id);
            const comment = await productModel.list.comment(req.params.id, page);

            res.render('single-product', {   product, specification, comment,
                                                    page_items, page, nPages,
                                                    next_page: page +1,
                                                    prev_page: page - 1,
                                                    can_go_next: page < nPages,
                                                    can_go_prev: page > 1 });
        }

    } catch (err) {
        console.log(err);
        res.send('Check error on server \'s console ');
    }
}

exports.singleProduct = (req, res, next) => {
    res.render('single-product');
}