const userModel = require('../models/userModel');

exports.register = (req, res, next) => {
    if(req.method == "POST"){
        console.log('post day');
        if (!req.files){
            return res.status(400).send('No files were uploaded.');
        }
				
        var file=req.files.chooseFile;
        var img_name=file.name;

        console.log(img_name);
        file.mv('public/images/uploaded/'+ img_name);
    }
    else{
        res.render('register');
    }

    
    //const logo_image = registerModel.list_logo_image();
    //res.render('register', { logo_image });
}

exports.login = (req, res, next) => {

    
    res.render('login');
    // const table = loginModel.listaccount();
    // const username = req.body.username;
    // const password = req.body.password;
    // const remember_me = Boolean(req.body.remember_me);
    // let result = false;
    // table.forEach(element => {
    //     if (username == element.username && password == element.password)
    //         result = true;
    // });
    // res.render('login', { username, password, remember_me, logo_image });
    // if (result) {
    //     // req.seasion.username = username;
    //     // req.seasion.signined = true;
    //     //res.render('layout', { signined: true });
    //     //res.render('index', { username, signined: true });
    //     res.send('<script>alert("Đăng nhập thành công")</script>');

    // } else {
    //     //req.seasion.signined = false;
    //     //res.render('layout', { signined: false });
    //     //res.render('index', { signined: false });
    //     res.send('<script>alert("Đăng ký thành công")</script>');
    // }
    // //res.redirect('index');
    // //console.log(req.seasion);

    // //res.render('login', {  });

}

exports.addUser = async function(req, res) {
    const {name, username, email, password} = req.body;

    const newUser = {
        name,
        username,
        email, 
        password,
        isAdmin: false
    };

    console.log('name usn pws, isadmin', newUser);

    try {
        await userModel.addUser(newUser).then(() => {
            return res.redirect('/user/login');
        });
    } catch (err) {
        return res.render('/user/register');
    }
}
