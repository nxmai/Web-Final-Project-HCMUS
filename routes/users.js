const express = require('express');
const { use } = require('.');
const router = express.Router();
const userController = require('../controllers/userController');
const passport = require('../passport');
const { isAuth } = require('../middleware/auth');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/register', (req, res) => res.render('register'));

router.get('/login', (req, res) => {
  //console.log('err login', req.flash('error'));
  const message = req.flash('error')[0];
  res.render('login', {message});
});

router.post('/register', userController.sendEmailToRegister);

router.post('/login', passport.authenticate('local', {successRedirect: '/',
                                                      failureRedirect: '/user/login',
                                                      failureFlash: true }));


router.get('/logout', isAuth, function(req, res){
  req.logout();
  res.redirect('/');
});                                                 

router.get('/activate/:token', userController.activateHandle);

router.get('/forgot-pwd', (req, res) => res.render('forgot-pwd'));

router.post('/forgot-pwd',  userController.forgotPassword);

router.get('/reset-pwd', (req, res) => res.render('reset-pwd'));

router.get('/forgot/:token', userController.gotoReset);

router.get('/reset/:id', (req, res) => {
  res.render('reset-pwd', {id: req.params.id});
});

router.post('/reset/:id', userController.resetPassword);

router.get('/my-account', isAuth, (req, res) => res.render('my-account'));

router.post('/my-account', isAuth, userController.updateAccount);

router.get('/update-pwd', isAuth, (req, res) => {
  res.render('update-pwd');
})

router.post('/update-pwd', isAuth, userController.updatePassword);

//router.post('/reset-pwd', )

module.exports = router;
