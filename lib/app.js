#!/usr/bin/env node

/** Dependecies **/
var express = require('express');
var routes = require('./routes/index');
var sitesRoutes = require('./routes/sites');
var categoriesRoutes = require('./routes/categories');
// API interfaces
var sabRoutes = require('./routes/api/sabnzbd');
var sickbeardRoutes = require('./routes/api/sickbeard');

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

app.use('/sabnzbd', sabRoutes);
app.use('/sickbeard', sickbeardRoutes);
app.use('/sites', sitesRoutes);
app.use('/categories', categoriesRoutes);
app.use('/', routes);


if(!module.parent){
  app.set('port', process.env.PORT || config.port);
  var server = app.listen(app.get('port'), function() {
      console.log('Listening on port %d', server.address().port);
  });
} 

module.exports = app;