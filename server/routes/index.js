var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var pageData =  { title: 'Express 4.0' };
  res.render('index', pageData);
  // res.render('index', { title: 'Express 4.0', layout: 'layouts/main' });
});

module.exports = router;