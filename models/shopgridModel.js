const db = require('../dal/mysql');
const config = require('../config/default.json');

module.exports.list = {
    getAll(query){
        //return db.load('select pr.id, pr.name, pr.price, pr.imagePath, pr.thumbnailPath, pr.availability, pr.summary, pr.description, ca.name from product as pr, category as ca where pr.categoryId = ca.id');
        if(Object.keys(query).length === 0 && query.constructor === Object){ //check empty object
            return db.load('select * from product limit 8');
        }

        if(Object.keys(query).length === 1 && query.constructor === Object && Object.keys(query)[0] == 'search'){
            return db.load(`select * from product where name like '%${query.search}%' limit 8`)
        }
        
        var sql = "";
        if(parseInt(query.category) > 0){
            sql += `where categoryId = ${query.category}`;

            if(query.search !== ''){
                sql += ` and name like '%${query.search}%'`;
            }
        } else {
            if(query.search !== ''){
                sql += ` where name like '%${query.search}%'`;
            }
        }
        
        if(query.sort !== 'default'){
            var str = query.sort.split("-", 2);
            sql += ` order by ${str[0]} ${str[1]}`;
        }

        sql += ` limit ${query.limit} offset ${(parseInt(query.page)-1)*(parseInt(query.limit))}`;
        return db.load('select * from product ' + sql);
    },
    single(id){
        return db.load(`select * from product where id = ${id}`);
    },
    category(){
        return db.load('select * from category');
    },
    specification(id){
        return db.load(`select s.content from product as p, specification as s where p.id=s.productid and p.id = ${id}`);
    },
    async count(query){
        if(Object.keys(query).length === 0 && query.constructor === Object){ //check empty object
            const res = await db.load('select count(*) as total from product limit 8');
            return res[0].total;
        }

        if(Object.keys(query).length === 1 && query.constructor === Object && Object.keys(query)[0] == 'search'){
            const res = await db.load(`select count(*) as total from product where name like '%${query.search}%' limit 8`)
            return res[0].total;
        }
        
        var sql = "";
        if(parseInt(query.category) > 0){
            sql += `where categoryId = ${query.category}`;

            if(query.search !== ''){
                sql += ` and name like '%${query.search}%'`;
            }
        } else {
            if(query.search !== ''){
                sql += ` where name like '%${query.search}%'`;
            }
        }
        
        if(query.sort !== 'default'){
            var str = query.sort.split("-", 2);
            sql += ` order by ${str[0]} ${str[1]}`;
        }

        sql += ` limit ${query.limit}`;
        const res = await db.load('select count(*) as total from product ' + sql);
        return res[0].total;
    }
}

// all(categoryId){
//     //return db.load('select pr.id, pr.name, pr.price, pr.imagePath, pr.thumbnailPath, pr.availability, pr.summary, pr.description, ca.name from product as pr, category as ca where pr.categoryId = ca.id');
//     if(typeof(categoryId) === 'undefined'){
//         return db.load(`select * from product limit ${config.pagination.limit} offset ${(page-1)*config.pagination.limit}`);
//     } else {
//         return db.load(`select * from product where categoryId = ${categoryId} limit ${config.pagination.limit} offset ${(page-1)*config.pagination.limit}`);
//     }
// },



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