const db = require('../dal/mysql');

module.exports.list = {
    getAll(query){
        //return db.load('select pr.id, pr.name, pr.price, pr.imagePath, pr.thumbnailPath, pr.availability, pr.summary, pr.description, ca.name from product as pr, category as ca where pr.categoryId = ca.id');
        if(Object.keys(query).length === 0 && query.constructor === Object){ //check empty object
            
            return db.load(`select pr.id, pr.name as name, pr.imagePath, pr.price, pr.thumbnailPath, ca.name as category, pr.availability, pr.summary, pr.description
                            from Product as pr join Category as ca on pr.categoryid = ca.id order by id
                            limit 8`);
        }

        if(Object.keys(query).length === 1 && query.constructor === Object && Object.keys(query)[0] == 'search'){
            
            return db.load(`select pr.id as id, pr.name as name, pr.imagePath, pr.price, pr.thumbnailPath, ca.name as category, pr.availability, pr.summary, pr.description
                            from Product as pr join Category as ca on pr.categoryid = ca.id 
                            where pr.name like '%${query.search}%' order by pr.id limit 8`)
        }
        
        var sql = "";
        if(parseInt(query.category) > 0){
            sql += `where categoryId = ${query.category}`;

            if(query.search !== ''){
                sql += ` and pr.name like '%${query.search}%'`;
            }
        } else {
            if(query.search !== ''){
                sql += ` where pr.name like '%${query.search}%'`;
            }
        }
        
        if(query.sort !== 'default'){
            var str = query.sort.split("-", 2);
            sql += ` order by ${str[0]} ${str[1]}`;
        }else if(query.sort == 'default'){
            sql += ` order by pr.id`;
        }

        sql += ` limit ${query.limit} offset ${(parseInt(query.page)-1)*(parseInt(query.limit))}`;
        return db.load(`select pr.id as id, pr.name as name, pr.imagePath, pr.price, pr.thumbnailPath, ca.name as category, pr.availability, pr.summary, pr.description
                        from Product as pr join Category as ca on pr.categoryid = ca.id `
                        + sql);
    },
    category(){
        return db.load('select * from Category');
    },
    async count(query){
        if(Object.keys(query).length === 0 && query.constructor === Object){ //check empty object
            const res = await db.load('select count(*) as total from Product limit 8');
            return res[0].total;
        }

        if(Object.keys(query).length === 1 && query.constructor === Object && Object.keys(query)[0] == 'search'){
            const res = await db.load(`select count(*) as total from Product where name like '%${query.search}%' limit 8`)
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
        const res = await db.load('select count(*) as total from Product ' + sql);
        return res[0].total;
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