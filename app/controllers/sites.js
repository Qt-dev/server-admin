var data = require('../../data.json');
var Site = require('../models/site');

exports.index = function(req, res){
  Site.findAll(function(error, sites){
    if(error){
      res.json({error: error})
    } else {
      res.json(sites)
    }
  })
};

exports.create = function(req,res){
  site = {}
  Site.model.create(req.body, function(error, result){
    if(error){
      res.send({ok: false}, 400);
    } else {
      result.category = result.category.idName;
      res.send(result);
    }
  });
}

exports.delete = function(req, res){
  Site.model.findById(req.params.id).remove(function(err, response, test){
    if(err) console.log(err);
    res.send({response: response});
  })
} 