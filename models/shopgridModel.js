const db = require('../dal/mysql');
const config = require('../config/default.json');

module.exports.list = {
    all(categoryId, page){
        //return db.load('select pr.id, pr.name, pr.price, pr.imagePath, pr.thumbnailPath, pr.availability, pr.summary, pr.description, ca.name from product as pr, category as ca where pr.categoryId = ca.id');
        if(typeof(categoryId) === 'undefined'){
            return db.load(`select * from product limit ${config.pagination.limit} offset ${(page-1)*config.pagination.limit}`);
        } else {
            return db.load(`select * from product where categoryId = ${categoryId} limit ${config.pagination.limit} offset ${(page-1)*config.pagination.limit}`);
        }
    },
    single(id){
        return db.load(`select * from product where id = ${id}`);
    },
    category(){
        return db.load('select * from category');
    },
    specification(id){
        return db.load(`select s.content from product as p, specification as s where p.id=s.productid and p.id = ${id}`);
    }
}



exports.list_logo_image = () => {
    return [{
            thumbnail: "images/apple-logo.png"
        },
        {
            thumbnail: "images/samsung-logo.png"
        },
        {
            thumbnail: "images/xiaomi-logo.png"
        },
        {
            thumbnail: "images/oppo-logo.png"
        }
    ]
}

exports.get = async (id) => {
    return listProduct[id];
}

exports.single = () => {
    return listProduct[1];
}