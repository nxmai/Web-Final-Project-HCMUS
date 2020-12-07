
const db = require('../dal/mysql');
// exports.list = () => {
    
//     const sql = "select * from product";
//     return db.load(sql);
// }

module.exports.list = {
    all(id){
        //return db.load('select pr.id, pr.name, pr.price, pr.imagePath, pr.thumbnailPath, pr.availability, pr.summary, pr.description, ca.name from product as pr, category as ca where pr.categoryId = ca.id');
        console.log(`query: ${id} `);
        if(typeof(id) === 'undefined'){
            return db.load('select * from product');
        } else {
            return db.load(`select * from product where categoryId = ${id}`);
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