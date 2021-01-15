const db = require('../dal/mysql');

module.exports.list = {
    async single(id){
        await db.load(`update Product set view = view + 1 where id = ${id}`);
        return db.load(`select pr.id as id, pr.name as name, pr.imagePath, pr.price, pr.thumbnailPath, ca.name as category, pr.availability, pr.summary, pr.description, pr.view
                        from Product as pr join Category as ca on pr.categoryid = ca.id 
                        where  pr.id = ${id}`);
    },
    specification(id){
        return db.load(`select s.content from Product as p, Specification as s where p.id=s.productid and p.id = ${id}`);
    },
    comment(id, page){
        return db.load(`select * from Comment where productId=${id} limit 3 offset ${(page-1) * 3}`);
    },
    async countAllComment(id){
        const res = await db.load(`select count(*) as total from Comment where productId=${id}`);
        return res[0].total;
    },
    add (entity){
        console.log('entity', entity);
        const sql = "INSERT INTO Comment SET ?";
        return db.add(sql, entity);
    },
    getById(id){
        return db.load(`select * from Product where id = ${id}`);
    }, 
    async getCateById (id){
        const res = await db.load(`select categoryId from Product where id = ${id}`);
        return res[0].categoryId;
    },
    getRelated(cate){
        return db.load(`select pr.id, pr.name as name, pr.imagePath, pr.price, pr.thumbnailPath, ca.name as category, pr.availability, pr.summary, pr.description
                        from Product as pr join Category as ca on pr.categoryid = ca.id 
                        where pr.categoryId = ${cate}`);
    },
    getBestSeller() {
        return db.load(`select distinct(p.id), p.thumbnailPath, p.name, p.price, c.name as category 
                        from ItemInCart as i join Product as p on i.itemId = p.id join Category 
                        as c on p.categoryId = c.id
        `);
    }
}