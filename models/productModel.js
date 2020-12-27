const db = require('../dal/mysql');

module.exports.list = {
    single(id){
        return db.load(`select pr.name as name, pr.imagePath, pr.price, pr.thumbnailPath, ca.name as category, pr.availability, pr.summary, pr.description
                        from Product as pr join Category as ca on pr.categoryid = ca.id 
                        where  pr.id = ${id}`);
    },
    specification(id){
        return db.load(`select s.content from Product as p, Specification as s where p.id=s.productid and p.id = ${id}`);
    }
}