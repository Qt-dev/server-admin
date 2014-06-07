var data = require('../../data.json');

exports.index = function(req, res){
  res.json(data.sites);
};