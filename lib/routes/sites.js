var express = require('express');
var data = require('../data.json');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.json(data.sites);
});

module.exports = router;
