const shopgridModel = require('../models/shopgridModel');
var cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: 'kylecloudy',
    api_key: '117882282768667',
    api_secret: 'PMJ0PmowbNRSyPJCQM6HVtSSAgA'
});

exports.index = async  (req, res, next) => {
    const page = +req.query.page || 1;
    const query = req.query;
    const shopgrid = await shopgridModel.list.getAll(query);
    const category = await shopgridModel.list.category();
    const totalPro = await shopgridModel.list.count(query);
    const limit = +query.limit || 8;
    
    const nPages = Math.ceil(totalPro/limit);
    const page_items = [];
    for(var i = 1; i <= nPages; i++){
        const item ={
            value: i
        }
        page_items.push(item);
    }

    for (item of shopgrid) {
        //item.imagePath = cloudinary.url(item.imagePath);
        item.imagePath = cloudinary.url(item.imagePath, { width: 290, height: 290, crop: "scale" })
    }

    res.render('shop-grid', { shopgrid, category, 
                            page_items, page, nPages,
                            next_page: page +1,
                            prev_page: page - 1,
                            can_go_next: page < nPages,
                            can_go_prev: page > 1
                        }); 


}