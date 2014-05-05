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
  'future': buildFuture,
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
        console.log("array", snatched);
      }else if(item.status === "Downloaded"){
        downloaded.push(item);
      }
    })

    var toRemove = [];
    snatched.forEach(function(item, index){
      downloaded.forEach(function(dlItem, dlIndex){
        if ((dlItem.tvdbid === item.tvdbid) && (dlItem.season === item.season) && (dlItem.episode === item.episode)){
          snatched[index] = false;
        }
      })
    })

    snatched.forEach(function(item){
      if(item){
        var data = {
          tvdbid: item.tvdbid,
          season: item.season,
          episode: item.episode,
          status: 'wanted'
        }
        sickbeard.api('setstatus', data, function(data){
        })
      }
    })
    callback({status: 'ok', number: snatched.length});
  });
}

module.exports = router;