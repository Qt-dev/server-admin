var Sickbeard = require('sickbeard');
var router = require('express').Router();

router.get('/query', function(req,res){
  var sickbeard = new Sickbeard(req.query.config.url, req.query.config.apiKey);
  actionSwitch[req.query.action](sickbeard, req.query.params, function(response){
    res.json(response);
  });
});

var actionSwitch = {
  'status': buildFuture,
  'relaunch': relaunchFailedDownloads
};

function buildFuture(sickbeard, params, callback){
  sickbeard.api('future', params, callback);
}

function relaunchFailedDownloads(sickbeard, params, callback){
  sickbeard.api('history', params, function(data){
    var snatched = [];
    var downloaded = [];
    data.data.forEach(function(item, index){
      if(item.status === "Snatched"){
        snatched.push(item);
      }else if(item.status === "Downloaded"){
        downloaded.push(item);
      }
    });

    snatched.forEach(function(item, index){
      downloaded.forEach(function(dlItem, dlIndex){
        if ((dlItem.tvdbid === item.tvdbid) && (dlItem.season === item.season) && (dlItem.episode === item.episode)){
          snatched[index] = false;
        }
      });
    });

    snatched.forEach(function(item){
      if(item){
        var itemparams = {
          tvdbid: item.tvdbid,
          season: item.season,
          episode: item.episode,
          status: 'wanted'
        };
        sickbeard.api('setstatus', itemparams, function(itemData){
          console.log('Added ', item, ' back to the wanted list');
        });
      }
    });
    callback({status: 'ok', number: snatched.length});
  });
}

module.exports = router;