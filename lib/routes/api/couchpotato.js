var Couchpotato = require('node-couchpotato');
var router = require('express').Router();

router.get('/query', function(req, res){
  var couchpotato = new Couchpotato(req.query.config);
  actionSwitch[req.query.action](couchpotato, req.query.params).then(function(response){
    res.json(response);
  });
});

var actionSwitch = {
  'status': buildStatus
};

/****************************************/
/*              API CALLS               */
/* Called with the switch above,        */
/* Return a promise with the built      */
/* response as the argument.            */
/****************************************/
function buildStatus(couchpotato, params){
  var response = {};
  return couchpotato.movie.list({status: "active"})
    .then(function(actives){
      response.actives = actives.movies;
      return couchpotato.movie.list();
    })
    .then(function(completeList){
      response.others = [];
      completeList.movies.forEach(function(item, index){
        if(item.status_id !== '7'){
          response.others.push(item);
        }
      });
      return response;
    });
}

module.exports = router;
