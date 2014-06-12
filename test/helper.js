global.expect = require('chai').expect;
global.sinon = require('sinon');
global.proxyquire = require('proxyquire');
global.tungus = require('tungus')
global.mongoose = require('mongoose');
global.Schema = mongoose.Schema;

var fs = require('fs');
var dbFolder = __dirname + '/db'

before(function(done){
  request = {};
  response = {};

  prepareDb(dbFolder);
  mongoose.connect('tingodb://'+dbFolder)

  loadControllers();
  setMockUp();

  seedSample(done);
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

function seedSample(done){
  Color = require('../app/models/color');
  Category = require('../app/models/category');
  Site = require('../app/models/site');
  seedColor(function(){
    seedCategories(done);
  })
};

function seedColor(done){
  mongoose.model('Color').create({title: 'black', hex: '#000'}, function(err, created){
    if(!err){
      color = created;
    }
    done();
  });
}

function seedCategories(done){
  var params1 = {idName:'testcat1', title:'testcat1', color: color}
  var params2 = {idName:'testcat2', title:'testcat2', color: color}
  mongoose.model('Category').create([params1,params2], function(error, resultCategory){
    category = resultCategory;
    done();
  })
}

function setMockUp(){
  dataMock = {
    sites: [
      {name: 'test'},
      {name: 'test2'}
      ],
    categories: [
      {name: 'test3'},
      {name: 'test4'}
    ]
  };
}

function loadControllers(done){
  pagesController = require('../app/controllers/pages');
}