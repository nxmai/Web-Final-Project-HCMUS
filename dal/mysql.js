
const mysql = require('mysql');




module.exports = {
  load(sql){
    return new Promise(
      function(done, fail){
        const connection = mysql.createConnection({
          host: 'localhost',
          user: 'root',
          password: '123456',
          database: 'product_list',
          insecureAuth: true,
      });

      connection.connect(err => {
            if(err) throw err;
            connection.query(sql, function (error, results, fields){
              if(error) fail(error);
              //console.log(results);
              else {
                done(results);
              }
      
              connection.end();
            })
      });

      }
    )

  //   connection.connect(err => {
  //     if(err) throw err;
  //     connection.query(sql, function (error, results, fields){
  //       if(error) throw error;
  //       //console.log(results);

  //       connection.end();
  //     })
  // });
  }
}


