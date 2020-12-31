const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/register', userController.register);

router.get('/login', userController.login);

router.post('/register', userController.addUser);

module.exports = router;
