function isAuth(req, res, next) {
    if(res.locals.isLogin == false){
        req.flash('error_msg', 'Please login first');
        return res.redirect('/user/login');
    }
    return next();
}
module.exports = {
    isAuth
}