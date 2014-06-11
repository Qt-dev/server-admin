global.expect = require('chai').expect;
global.sinon = require('sinon');
global.proxyquire = require('proxyquire');
global.tungus = require('tungus')
global.mongoose = require('mongoose');
global.Schema = mongoose.Schema;
var fs = require('fs');
var dbFolder = __dirname + '/db'

before(function(){
  request = {};
  response = {};

  prepareDb(dbFolder);
  mongoose.connect('tingodb://'+dbFolder)
})

after(function(){
  cleanDb(dbFolder);
})

function prepareDb(folder){
  if(!fs.existsSync(folder)){ 
    fs.mkdir(folder) 
  } else { 
    console.log('No need to create db, it already exists');
  }
}

function cleanDb(folder){
  if(fs.existsSync(folder)){
    fs.readdirSync(folder).forEach(function(file,index){
        var curPath = folder + "/" + file;
        fs.unlinkSync(curPath);
      });
    fs.rmdir(folder)
  }
}