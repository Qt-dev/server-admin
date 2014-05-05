var Sickbeard = require('sickbeard');
var router = require('express').Router();

router.get('/query', function(req,res){
  console.log(req.query);
  var sickbeard = new Sickbeard(req.query.url, req.query.key);
  actionSwitch[req.query.action](sickbeard, req.query.params, function(response){
    res.json(response);
  });
});

var actionSwitch = {
  'future': buildFuture
};

function buildFuture(sickbeard, params, callback){
  sickbeard.api('future', params, function(data){
    callback(data);
  });
}

module.exports = router;