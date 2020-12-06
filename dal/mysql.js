
const mysql = require('mysql');
const util = require('util');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'product_list',
  insecureAuth: true,
  connectionLimit: 50,
});

const pool_query = util.promisify(pool.query).bind(pool);

module.exports = {
  load(sql){
    return pool_query(sql);
  }
  //load: sql => pool_query(sql);

  // load(sql){
  //   return new Promise(
  //     function(done, fail){
  //           pool.query(sql, function (error, results, fields){
  //             if(error) {
  //               fail(error);
  //             }
  //             else {
  //               done(results);
  //             }
  //           })
  //     }
  //   )
  // }
}


