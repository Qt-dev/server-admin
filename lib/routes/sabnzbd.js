var SABnzbd = require('sabnzbd');
var express = require('express');
var router = express.Router();

router.get('/query', function(req, res){
  var sabnzbd = new SABnzbd(req.query.url,req.query.apiKey);
  actionSwitch[req.query.action](sabnzbd).then(function(response){
    res.json(response);
  });
});

var actionSwitch = {
  'status': buildStatus,
  'pause': pauseAll,
  'resume': resumeAll,
  'clean': cleanHistory
};

/****************************************/
/*              API CALLS               */
/* Called with the switch above,        */
/* Return a promise with the built      */
/* response as the argument.            */
/****************************************/
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

function pauseAll(sabnzbd){
  return sabnzbd.queue.pause()
    .then(function(result){
      return result;
    });
}

function resumeAll(sabnzbd){
  return sabnzbd.queue.resume()
    .then(function(status){
      return status;
    });
}

function cleanHistory(sabnzbd){
  return sabnzbd.history.delete('all')
    .then(function(status){
      return status;
    });
}

module.exports = router;
