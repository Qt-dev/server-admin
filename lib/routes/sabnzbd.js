var SABnzbd = require('sabnzbd');
var express = require('express');
var router = express.Router();

router.get('/status', function(req, res) {
  var sabnzbd = new SABnzbd(req.query.url,req.query.key);
  sabnzbd.status()
    .then(function(status){
      res.json(status);
    });
});

router.get('/pause', function(req, res){
  var sabnzbd = new SABnzbd(req.query.url,req.query.key);
  sabnzbd.queue.pause()
    .then(function(status){
      res.json(status);
    });
});

router.get('/resume', function(req, res){
  var sabnzbd = new SABnzbd(req.query.url,req.query.key);
  sabnzbd.queue.resume()
    .then(function(status){
      res.json(status);
    });
});

module.exports = router;
