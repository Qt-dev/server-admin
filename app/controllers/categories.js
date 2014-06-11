var data = require('../../data.json');
var Category = require('../models/category');

exports.index = function(req, res){
  Category.findAll(function(error, categories){
    if(error){
      res.json({error: error});
    } else {
      res.json(categories)
    }
  })
}

exports.show = function(req, res){
  res.json(data.categories[req.params.id]);
}