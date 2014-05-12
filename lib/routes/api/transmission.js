var Transmission = require('transmission');
var router = require('express').Router();

router.get('/query', function(req,res){
  var transmission = new Transmission(req.query.config);
  actionSwitch[req.query.action](transmission, req.query.params, function(response){
    res.json(response);
  });
});


var actionSwitch = {
  'status': getStatus,
  'pauseToggle': pauseToggle,
  'clean': cleanAll,
  'cleanFinished': cleanFinished
};

/***********************************/
/***********   Actions   ***********/
/***********************************/
function getStatus(transmission, params, callback){
  transmission.get(function(error,response){
    // Response is a set of all the torrents, we split them in here.
    if(response){
      var output = buildTorrentList(response);
      output.status = buildStatus(output);
      output.ok = true;
      callback(output);
    } else {
      callback({ok: false});
    }
  });
}

function pauseToggle(transmission, params, callback){
  transmission.get(function(error,response){
    var torrents = buildTorrentList(response);
    if (params.paused === "true"){
      resumeAll(transmission,torrents, callback);
    } else {
      pauseAll(transmission,torrents, callback);
    }
  });
}

function cleanAll(transmission, params, callback){
  transmission.get(function(error,response){
    var ids = response.torrents.map(function(item){
      return item.id;
    });
    transmission.remove(ids, true, function(error, response){
      callback({ids: ids, ok: true, error: error, response: response});
    });
  });
}

function cleanFinished(transmission, params, callback){
  transmission.get(function(error,response){
    var ids = [];
    response.torrents.forEach(function(item){
      if(item.isFinished === "true"){
        ids.push(item.id);
      }
    });
    transmission.remove(ids, true, function(error, response){
      callback({ids: ids, ok: true, error: error, response: response});
    });
  });
}

/***********************************/
/***********   Helpers   ***********/
/***********************************/
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

function buildStatus(torrentList){
  return {
    paused: isPaused(torrentList),
    activeTorrents: torrentList.ongoing.length
  };
}

function isPaused(torrentList){
  return((torrentList.ongoing.length === 0) && (torrentList.others.length !== 0));
}

function pauseAll(transmission, torrents, callback){
  var ids = torrents.ongoing.map(function(item){
    return item.id;
  });
  transmission.stop(ids,function(error, response){
    var data = {ok: true, error: error, response: response};
    callback(data);
  });
}

function resumeAll(transmission, torrents, callback){
  var ids = torrents.others.map(function(item){
    return item.id;
  });
  transmission.startNow(ids,function(error, response){
    var data = {ok: true, error: error, response: response};
    callback(data);
  });
}

module.exports = router;