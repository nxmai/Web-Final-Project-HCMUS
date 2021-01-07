const userModel = require('../models/userModel');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

exports.register = (req, res, next) => {
    if (req.method == "POST") {
        console.log('post day');
        if (!req.files) {
            return res.status(400).send('No files were uploaded.');
        }

        var file = req.files.chooseFile;
        var img_name = file.name;

        console.log(img_name);
        file.mv('public/images/uploaded/' + img_name);
    }
    else {
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

//doesnt create user in database, just send email and wait for user to verify email
exports.sendEmailToRegister = async function (req, res) {
    const { name, username, email, password, cfpassword } = req.body;

    if (!name || !username || !email || !password || !cfpassword) {
        req.flash('error_msg','Please enter all fields');
        return res.redirect('/user/register');
    }

    if (password != cfpassword) {
        req.flash('error_msg', 'Confirm password not correct');
        return res.redirect('/user/register');
    }

    if (await userModel.isEmailExist(email) == true) {
        req.flash('error_msg', 'Email already exist');
        return res.redirect('/user/register');
    }

    console.log('testttt');
    const token = jwt.sign({ name, username, email, password }, process.env.JWT_KEY, { expiresIn: '30m' });
    const output = `
            <h2>Please click on below link to activate your account</h2>
            <a href="${process.env.CLIENT_URL}/user/activate/${token}">Link</a>
            <p><b>NOTE: </b> The above activation link expires in 30 minutes.</p>
            `;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "electric.shop.verify@gmail.com",
            pass: process.env.AUTH_PASS
        },
    });

    // send mail with defined transport object
    const mailOptions = {
        from: `"Store Admin" <electric.shop.verify@gmail.com>`,
        to: email,
        subject: "Account Verification",
        html: output,
    };

    //bug: render not working
    transporter.sendMail(mailOptions, async (error, info) => {
        if (error) {
            console.log(error);
            console.log('somthing wrong');
            req.flash('error_msg','Something wrong when sending email. Please register again.');
            return res.redirect('/user/register');
        }
        else {
            console.log('sent send mail register');
            req.flash('success_msg', 'Activation link sent to email ID. Please activate to log in.');
            return res.redirect('/user/login'); 
        }
    });
}

exports.activateHandle = async (req, res) => {
    const token = req.params.token;

    if (token) {
        jwt.verify(token, process.env.JWT_KEY, async (err, decodedToken) => {
            if (err) {
                console.log('jwt verify err');
                req.flash('error_msg', 'Incorrect or expired link! Please register again.');
                return res.redirect('/user/register');
            } else {
                const { name, username, email, password } = decodedToken;

                const user = await userModel.getUserByEmail(email);
                console.log('user', user);

                if (user) {
                    console.log('email already exist, please login');
                    req.flash('error_msg', 'Email already registered. Please login');
                    return res.redirect('/user/login');
                } else {
                    const newUser = {
                        username,
                        password,
                        email,
                        name,
                        isAdmin: false,
                        isActive: true
                    }

                        await userModel.addUser(newUser).then(() => {
                            console.log('account activea, please login');
                            req.flash('success_msg', 'Account activated. Please login');
                            return res.redirect('/user/login');
                        })
                        .catch(err => console.log('err', err));
                    
                    console.log('test gi ko biet');
                }
            }
        })
    }
    return;
}

exports.forgotPassword = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        req.flash('error_msg', 'Please enter an email.');
        return res.redirect('/user/forgot-pwd');
    }
    console.log('email', email);
    await userModel.getUserByEmail(email).then(user => {
        if (!user) {
            req.flash('error_msg', 'Email does not exist.');
            return res.redirect('/user/forgot-pwd');
        } else {
            console.log('forgot pwd', user);
            const token = jwt.sign({ id: user.id}, process.env.JWT_RESET, { expiresIn: '30m' });

            const output = `
            <h2>Please click on below link to reset your password account</h2>
            <a href="${process.env.CLIENT_URL}/user/forgot/${token}">Link</a>
            <p><b>NOTE: </b> The above activation link expires in 30 minutes.</p>
            `;

            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: "electric.shop.verify@gmail.com",
                    pass: process.env.AUTH_PASS
                },
            });

            // send mail with defined transport object
            const mailOptions = {
                from: `"Store Admin" <electric.shop.verify@gmail.com>`,
                to: email,
                subject: "Reset password account",
                html: output,
            };

            //bug: render not working
            transporter.sendMail(mailOptions, async (error, info) => {
                if (error) {
                    console.log(error);
                    console.log('somthing wrong');
                    //return res.render('register', { message: 'Something wrong when sending email.' });
                    req.flash('error_msg', 'Something wrong when sending email.');
                    return res.redirect('/user/forgot-pwd');
                }
                else {
                    console.log('sent forgot');
                    req.flash('success_msg', 'Email sent. Please go to your email to reset password by the instruction.');
                    return res.redirect('/user/login'); 
                }
            });

        }
    })
}

exports.gotoReset = async (req, res) => {
    const token = req.params.token;

    if(token) {
        jwt.verify(token, process.env.JWT_RESET, async (error, decodedToken) => {
            if(error){
                console.log('wrong gotoreset');
                req.flash('error_msg', 'Incorrect or expired link! Please try again');
                return res.redirect('/user/login');
            } else {
                const {id} = decodedToken;
                console.log('get id', id);
                await userModel.getUser(id).then((user) => {
                    return res.redirect(`/user/reset/${id}`);
                })
                .error(() =>{
                    console.log('fail');
                    return res.redirect('user/login');
                })
            }
        } )
    } else{
        console.log('reset fail');
    }
}

exports.resetPassword = async (req, res) => {
    const {password, cfpassword} = req.body;
    const id = req.params.id;

    if(!password || !cfpassword){
        req.flash('error_msg', 'Please enter all field');
        return res.redirect(`/user/reset/${id}`);
    }

    else if(password != cfpassword){
        req.flash('error_msg', 'Confirm password do not match.');
        return res.redirect(`/user/reset/${id}`);
    }
    
    else{
        try {
            userModel.updatePassword(id, password) .then(() => {
                req.flash('success_msg', 'Password reset successfully. Please login');
                return res.redirect('/user/login');
            });
        } catch{
            console.log('fail update');
            req.flash('error_msg', 'Fail when update password. Please do again');
            return res.redirect('/user/login');
        }
    }
}