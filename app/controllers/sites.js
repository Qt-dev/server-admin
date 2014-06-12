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