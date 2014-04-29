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
})