const userModel = require('../../models/userModel');

exports.isEmailExist = async (req, res) => {
    res.json(await userModel.isEmailExist(req.query.email)) ;
} 