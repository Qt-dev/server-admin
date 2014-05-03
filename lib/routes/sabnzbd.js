var SABnzbd = require('sabnzbd');
var express = require('express');
var router = express.Router();

router.get('/status', function(req, res) {
  var key = req.query.api;
  var url = req.query.url;
  var sabnzbd = new SABnzbd(url,key);
  sabnzbd.status()
    .then(function(status){
      res.json(status)
    });
});

module.exports = router;
