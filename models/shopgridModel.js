

// exports.list = () => {
//     return listProduct;
// }

const db = require('../dal/mysql');
// exports.list = () => {
    
//     const sql = "select * from product";
//     return db.load(sql);
// }

module.exports.list = {
    all(){
        return db.load('select * from product');
    },
    single(id){
        return db.load('select * from product where id = ' + id);
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