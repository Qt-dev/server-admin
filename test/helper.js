global.expect = require('chai').expect;
global.sinon = require('sinon');
global.proxyquire = require('proxyquire');

before(function(){
  request = {};
  response = {};
})