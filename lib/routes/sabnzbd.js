var SABnzbd = require('sabnzbd');
var express = require('express');
var router = express.Router();

router.get('/status', function(req,res) {
  var sabnzbd = new SABnzbd(req.query.url,req.query.key);
  var response = {};
  sabnzbd.status()
    .then(function(status){
      console.log('1');
      response.status = status;
      return sabnzbd.queue.entries();
    })
    .then(function(queue){
      console.log("2");
      response.queue = queue;
      return sabnzbd.history.entries();
    })
    .then(function(history){
      response.history = history;
      res.json(response);
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
