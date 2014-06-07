var apiDir = '../../lib/apis/'

exports.query = function(req, res){
    var app = req.query.app;
    var api = require(apiDir + app);
    var callback = function(response){
      res.json(response)
    }
    api.query(req, callback);
  }
