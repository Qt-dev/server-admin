var Sickbeard = require('sickbeard');
var router = require('express').Router();

router.get('/query', function(req,res){
  console.log(req.query);
  sickbeard = new Sickbeard(req.query.url, req.query.key);
  sickbeard.api('future', '', function(data){
    console.log(data);
    res.json(data); // Data is formatted this way
  });
});

module.exports = router;