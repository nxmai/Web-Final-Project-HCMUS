const loginModel = require('../models/loginModel');

exports.login = (req, res, next) => {

    const logo_image = loginModel.list_logo_image();
    res.render('login', { logo_image });
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