var request = require('supertest')
  , express = require('express')
  , expect = require('chai').expect;

var app = require('../lib/app');

describe('routes', function(){
  it('should have an index route', function(done){
    request(app)
      .get('/')
      .expect(200, done);
  })
  it('should have a data.json route', function(done){
    request(app)
      .get('/data.json')
      .expect('Content-Type', /json/)
      .expect(200,done)
  })
})