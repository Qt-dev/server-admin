var tungus = require('tungus');
var mongoose = require('mongoose');
var fs = require('fs');

var dbFolder = 'db';

function prepareDb(){
  if(!fs.existsSync('db')){ 
    fs.mkdir('db') 
  } else { 
    console.log('No need to create db, it already exists');
  }
}

function connect(){
  var options = { server: { socketOptions: { keepAlive: 1 } } };
  mongoose.connect('tingodb://db', options);
}

function setListeners(){
  mongoose.connection.on('error', function(err){
    console.log(err);
  })

  mongoose.connection.on('disconnected', function(){
    connect();
  })
}

exports.start = function(){
  prepareDb();
  connect();
  setListeners();
}