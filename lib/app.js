#!/usr/bin/env node

/** Dependecies **/
var express = require('express');
var routes = require('./routes/index');
var sabroutes = require('./routes/sabnzbd');

// Config
var config = {
  port: 3000
};

var app = express();

// Set view engine to jsx
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());

// Set public and views folders
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));

app.use('/sabnzbd', sabroutes);
app.use('/', routes);


if(!module.parent){
  app.set('port', process.env.PORT || config.port);
  var server = app.listen(app.get('port'), function() {
      console.log('Listening on port %d', server.address().port);
  });
} 

module.exports = app;