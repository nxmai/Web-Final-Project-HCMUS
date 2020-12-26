
const mysql = require('mysql');
const util = require('util');

// const pool = mysql.createPool({
//   host: 'localhost',
//   user: 'root',
//   password: '123456',
//   database: 'product_list',
//   insecureAuth: true,
//   connectionLimit: 50,
// });

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
  connectionLimit: process.env.DB_CONNECTIONLIMIT
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


