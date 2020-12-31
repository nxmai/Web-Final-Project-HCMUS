const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const passport = require('../passport');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/register', userController.register);

router.get('/login', userController.login);

router.post('/register', userController.addUser);

router.post('/login', passport.authenticate('local', {successRedirect: '/',
                                                      failureRedirect: '/user/login?error=wrong',
                                                      failureFlash: false }));


router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});                                                 

module.exports = router;
