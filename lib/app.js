#!/usr/bin/env node

/** Dependecies **/
var express = require('express');

var routes = require('./routes/index');

// Config
var config = {
  port: 3000
};

var app = express();

app.use('/', app.router);
app.use(express.static(__dirname + '/public'))

app.set('port', process.env.PORT || config.port);
var server = app.listen(app.get('port'), function() {
    console.log('Listening on port %d', server.address().port);
});