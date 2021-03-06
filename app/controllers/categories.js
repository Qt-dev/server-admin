var Category = require('../models/category');

exports.index = function(req, res){
  Category.findAll(function(error, categories){
    if(error){
      res.json({error: error});
    } else {
      res.json(categories);
    }
  })
}

exports.show = function(req, res){
  Category.find(req.params.title, function(error,category){
    if(error){
      res.json({error: error});
    } else {
      res.json(category);
    }
  })
}