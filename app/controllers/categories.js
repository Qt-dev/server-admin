var data = require('../../data.json');

exports.index = function(req, res){
  res.json(data.categories);
}

exports.show = function(req, res){
  res.json(data.categories[req.params.id]);
}