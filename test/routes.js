var request = require('supertest');
var express = require('express');


describe('The routes', function(){
  before(function(){
    sendResponse = function(req,res){
      res.send(200,{ok:true, params: req.params})
    }
  })

  describe('pages', function(){
    before(function(){
      pagesMock = {
        index: sendResponse
      }
      sinon.spy(pagesMock, 'index');
      var router = proxyquire('../lib/routes', {
        '../app/controllers/pages': pagesMock
      });

      app = express();
      app.use('/', router);
    })
    it('should route "/" to pages.index', function(done){
      request(app).get('/')
              .expect(200)
              .end(function(err,res){
                expect(pagesMock.index.called).to.be.true
                pagesMock.index.restore();
                expect(res.body.ok).to.be.true;
                done();
              })
    })
  })
  describe('the sites', function(){
    before(function(){
      sitesMock = {
        index: sendResponse
      }
      sinon.spy(sitesMock, 'index');
      var router = proxyquire('../lib/routes', {
        '../app/controllers/sites': sitesMock
      });

      app = express();
      app.use('/', router);
    })
    it('should route "/sites" to sites.index', function(done){
      request(app).get('/sites')
              .expect(200)
              .end(function(err,res){
                expect(sitesMock.index.called).to.be.true
                sitesMock.index.restore();
                expect(res.body.ok).to.be.true;
                done();
              })
    })
  })
  describe('the sites', function(){
    before(function(){
      categoriesMock = {
        index: sendResponse,
        show: sendResponse
      }
      sinon.spy(categoriesMock, 'index');
      sinon.spy(categoriesMock, 'show');
      var router = proxyquire('../lib/routes', {
        '../app/controllers/categories': categoriesMock
      });

      app = express();
      app.use('/', router);
    })
    it('should route "/categories" to categories.index', function(done){
      request(app).get('/categories')
              .expect(200)
              .end(function(err,res){
                expect(categoriesMock.index.called).to.be.true
                categoriesMock.index.restore();
                expect(res.body.ok).to.be.true;
                done();
              })
    })
    it('should route "/category/id" to categories.show', function(done){
      request(app).get('/categories/0')
              .expect(200)
              .end(function(err,res){
                expect(categoriesMock.show.called).to.be.true
                categoriesMock.show.restore();
                expect(res.body.params.id).to.equal('0');
                expect(res.body.ok).to.be.true;
                done();
              })
    })
  })

})