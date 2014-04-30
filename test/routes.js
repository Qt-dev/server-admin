var request = require('supertest')
  , express = require('express')
  , expect = require('chai').expect;

var app = require('../lib/app');

describe('routes', function(){
  describe('the index route', function(){
    it('should have an index route', function(done){
      request(app)
        .get('/')
        .expect(200, done);
    })
  })
  describe('data.json route', function(){
    it('should exist', function(done){
      request(app)
        .get('/data.json')
        .expect('Content-Type', /json/)
        .expect(200,done)
    })
    describe('rendered object', function(){
      beforeEach(function(){
        getData = function(done,test){
          request(app)
            .get('/data.json')
            .end(function(err,res){
              test(res);
              done();
            });
        }
      })
      it('should have a title', function(done){
        var test = function(res){
          expect(res.body.title).to.exist;
        }
        getData(done,test);
      })
      it('should have sites', function(done){
        var test = function(res){
          expect(res.body.sites).to.exist;
        }
        getData(done,test);
      })
      it('should have categories', function(done){
        var test = function(res){
          expect(res.body.categories).to.exist;
        }
        getData(done,test);
      })
    })
  }) 
})