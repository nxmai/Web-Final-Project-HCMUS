const db = require('../dal/mysql');
const bcrypt = require('bcrypt');

exports.addUser = async (newUser) => {
    const saltRounds = 10;
    
    await bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(newUser.password, salt, function(err, hash) {
            const user = {
                name: newUser.name,
                usn: newUser.username,
                email: newUser.email, 
                pwd: hash,
                isAdmin: newUser.isAdmin
            }
            console.log('pwd', hash);
            console.log('user', user);

            const sql = "INSERT INTO User SET ?";
            return db.add(sql, user);
        })
    })


    //return;
}