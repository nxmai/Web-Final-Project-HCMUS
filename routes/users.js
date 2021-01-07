const express = require('express');
const { use } = require('.');
const router = express.Router();
const userController = require('../controllers/userController');
const passport = require('../passport');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/register', (req, res) => res.render('register'));

router.get('/login', (req, res) => res.render('login'));

router.post('/register', userController.sendEmailToRegister);

router.post('/login', passport.authenticate('local', {successRedirect: '/',
                                                      failureRedirect: '/user/login?error=wrong',
                                                      failureFlash: false }));


router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});                                                 

router.get('/activate/:token', userController.activateHandle);

router.get('/forgot-pwd', (req, res) => res.render('forgot-pwd'));

router.post('/forgot-pwd', userController.forgotPassword);

router.get('/reset-pwd', (req, res) => res.render('reset-pwd'));

router.get('/forgot/:token', userController.gotoReset);

router.get('/reset/:id', (req, res) => {
  res.render('reset-pwd', {id: req.params.id});
});

router.post('/reset/:id', userController.resetPassword);

//router.post('/reset-pwd', )

module.exports = router;
