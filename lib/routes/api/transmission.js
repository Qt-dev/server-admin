var Transmission = require('transmission');
var router = require('express').Router();

router.get('/query', function(req,res){
  var transmission = new Transmission(req.query.config);
  actionSwitch[req.query.action](transmission, req.query.params, function(response){
    res.json(response);
  });
});


var actionSwitch = {
  'status': getStatus
};

function getStatus(transmission, params, callback){
  transmission.get(function(error,response){
    // Response is a set of all the torrents, we split them in here.
    var torrentList = buildTorrentList(response);
    var status = buildStatus(torrentList)
    callback(torrentList);
  });
}

function buildStatus(torrentList){
  var data = {
    paused: isPaused(torrentList),
    activeTorrents: torrentList.ongoing.length
  }
}

function isPaused(torrentList){
  return((torrentList.ongoing.length === 0) && (torentList.others.length !== 0));
}

function buildTorrentList(response){
  var ongoing = [];
  var others = [];
  response.torrents.forEach(function(item){
    if(item.status === 4){
      ongoing.push(item);
    } else {
      others.push(item);
    }
  });
  return({ongoing: ongoing, others: others});
}

module.exports = router;