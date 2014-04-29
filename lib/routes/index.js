var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index');
});
router.get('/data.json', function(req, res){
  res.json({test: 'test'});
});

module.exports = router;
