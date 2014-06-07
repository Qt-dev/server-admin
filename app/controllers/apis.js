var apiDir = '../../lib/apis/'

exports.query = function(req, res){
    var app = req.query.app;
    var api = require(apiDir + app);
    res.json(api.query(req))
  }
