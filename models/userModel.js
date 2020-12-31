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
    }) //return;
}

exports.checkCredential = async (username, password) => {
    const sql = `select * from User where usn = '${username}'`;
    const user = await db.load(sql);
    if(user.length == 0){
        return false;
    } 

    const checkPassword = await bcrypt.compare(password, user[0].pwd);
    if(checkPassword){
        console.log('check');
        return user[0];
    }

    return false;
}

exports.getUser = async (id) => {
    const sql = `select * from User where id = ${id}`;
    const user = await db.load(sql);

    if(!user){
        return false;
    }
    return user[0];
}