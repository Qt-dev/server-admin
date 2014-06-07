var request = require('supertest');
var express = require('express');


describe('The routes', function(){
  function setMocksUp(){
    var sendResponse = function(req,res){
      res.send(200,{ok:true, params: req.params})
    }
    pagesMock = {
      index: sendResponse
    }
    sitesMock = {
      index: sendResponse
    }
    categoriesMock = {
      index: sendResponse,
      show: sendResponse
    }
  }

  before(function(){
    setMocksUp();
    var router = proxyquire('../lib/routes', {
      '../app/controllers/pages': pagesMock,
      '../app/controllers/sites': sitesMock,
      '../app/controllers/categories': categoriesMock
    });

    app = express();
    app.use('/', router);
  })
  describe('pages', function(){
    it('should route "/" to pages.index', function(done){
      request(app).get('/')
              .expect(200)
              .end(function(err,res){
                expect(res.body.ok).to.be.true;
                done();
              })
    })
  })
  describe('the sites', function(){
    it('should route "/sites" to sites.index', function(done){
      request(app).get('/sites')
              .expect(200)
              .end(function(err,res){
                expect(res.body.ok).to.be.true;
                done();
              })
    })
  })
  describe('the sites', function(){
    it('should route "/categories" to sites.index', function(done){
      request(app).get('/categories')
              .expect(200)
              .end(function(err,res){
                expect(res.body.ok).to.be.true;
                done();
              })
    })
    it('should route "/category/id" to sites.index', function(done){
      request(app).get('/categories/0')
              .expect(200)
              .end(function(err,res){
                expect(res.body.params.id).to.equal('0');
                expect(res.body.ok).to.be.true;
                done();
              })
    })
  })

})