var express = require('express');
var data = require('../data.json');
var router = express.Router();

/* GET home page. */
router.get('/:id', function(req, res) {
  res.json(data.categories[req.params.id]);
});
router.get('/', function(req, res){
  res.json(data.categories);
});

module.exports = router;
