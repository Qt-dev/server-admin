var SABnzbd = require('sabnzbd');
var express = require('express');
var router = express.Router();

router.get('/query', function(req, res){
  var sabnzbd = new SABnzbd(req.query.config.url,req.query.config.apiKey);
  actionSwitch[req.query.action](sabnzbd, req.query.params).then(function(response){
    res.json(response);
  });
});

var actionSwitch = {
  'pauseToggle': pauseToggle,
  'status': buildStatus,
  'clean': cleanHistory
};

/****************************************/
/*              API CALLS               */
/* Called with the switch above,        */
/* Return a promise with the built      */
/* response as the argument.            */
/****************************************/
function pauseToggle(sabnzbd, params){
  var response = {};
  if(JSON.parse(params.paused)){
    return sabnzbd.queue.resume()
      .then(function(result){
        return result;
      });
  } else {
    return sabnzbd.queue.pause()
      .then(function(result){
        return result;
      });
  }
}

function buildStatus(sabnzbd){
  var response = {};
  return sabnzbd.status()
    .then(function(status){
      response.status = status;
      return sabnzbd.queue.entries();
    })
    .then(function(queue){
      response.queue = queue;
      return sabnzbd.history.entries();
    })
    .then(function(history){
      response.history = history;
      return response;
    });
}

function cleanHistory(sabnzbd){
  return sabnzbd.history.delete('all')
    .then(function(status){
      return status;
    });
}

module.exports = router;
