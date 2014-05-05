var Sickbeard = require('sickbeard');
var router = require('express').Router();

router.get('/query', function(req,res){
  console.log(req.query);
  sickbeard = new Sickbeard(req.query.url, req.query.key);
  sickbeard.api(req.query.action, '', function(data){
    console.log(data);
    res.json(data);
  });
});

module.exports = router;