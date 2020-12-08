const registerModel = require('../models/registerModel');

exports.index = (req, res, next) => {
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