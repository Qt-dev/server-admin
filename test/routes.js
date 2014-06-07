var request = require('supertest');
var express = require('express');


describe('The routes', function(){
  before(function(){

    var sendResponse = function(req,res){
      res.send(200,{ok:true})
    }
    pagesMock = {
      index: sendResponse
    }



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
              expect(res.ok).to.be.true;
              done();
            })
  })

})