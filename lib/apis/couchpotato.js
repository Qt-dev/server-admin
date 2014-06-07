var Couchpotato = require('node-couchpotato');

exports.query = function(req, callback){
  var couchpotato = new Couchpotato(req.query.config);
  actionSwitch[req.query.action](couchpotato, req.query.params).then(function(response){
    callback(response);
  });
};

var actionSwitch = {
  'status': getStatus
};

/****************************************/
/*              API CALLS               */
/* Called with the switch above,        */
/* Return a promise with the built      */
/* response as the argument.            */
/****************************************/
function getStatus(couchpotato, params){
  var response = {};
  return couchpotato.movie.list({status: "active"})
    .then(function(actives){
      response.actives = actives.movies;
      return couchpotato.movie.list();
    })
    .then(function(completeList){
      response.others = [];
      response.status = {};
      buildOthers(completeList, response.others);
      buildStatus(completeList, response.status);
      return response;
    });
}

function buildOthers(input, output){
  input.movies.forEach(function(item, index){
    if((item.status_id !== 7) && (item.status_id !== 5)){
      output.push(item);
    }
  });
}

function buildStatus(input, output){
  output.actives = 0;
  input.movies.forEach(function(item){
    if(item.status_id === 7){
      output.actives++;
    }
  });
  output.total = input.movies.length;
}