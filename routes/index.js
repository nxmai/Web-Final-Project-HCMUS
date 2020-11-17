var express = require('express');
var router = express.Router();
const productController = require('../controllers/productController');

router.get('/', productController.index);
/* GET home page. */
// router.get('/', function(req, res) {
//   res.render('index');
// });

router.get('/:page', (req, res) => {
  let page = req.params.page;
  res.render(page);
})

module.exports = router;
