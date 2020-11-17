const registerModel = require('../models/registerModel');

exports.index = (req, res, next) => {

    const logo_image = registerModel.list_logo_image();
    res.render('register', { logo_image });
}