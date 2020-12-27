const shopgridModel = require('../models/shopgridModel');

exports.index = async  (req, res, next) => {
    const page = +req.query.page || 1;
    const query = req.query;
    const shopgrid = await shopgridModel.list.getAll(query);
    const category = await shopgridModel.list.category();
    const totalPro = await shopgridModel.list.count(query);
    
    const nPages = Math.ceil(totalPro/8);
    const page_items = [];
    for(var i = 1; i <= nPages; i++){
        const item ={
            value: i
        }
        page_items.push(item);
    }

    res.render('shop-grid', { shopgrid, category, 
                            page_items,
                            next_page: page +1,
                            prev_page: page - 1,
                            can_go_next: page < nPages,
                            can_go_prev: page > 1
                        }); 


}