
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'product_list',
    insecureAuth: true,
});


connection.connect(err => {
    if(err) throw err;
    connection.query("select * from product", function (error, results, fields){
      if(error) throw error;
      console.log(results[1]);
      connection.end();
    })

});
// 


// connection.end();