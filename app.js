var express = require('express');

// Config
var config = {
  port: 3000
};

var app = express();

// Prepare the router
var router = require('./config/routes');
app.use('/',router);

// Prepare the db
var db = require('./config/db');
db.start();

// Set view engine to jsx
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());

// Set public and views folders
app.set('views', __dirname + '/app/views');
app.use(express.static(__dirname + '/lib/public'));

if(!module.parent){
  app.set('port', process.env.PORT || config.port);
  var server = app.listen(app.get('port'), function() {
      console.log('Listening on port %d', server.address().port);
  });
} 

module.exports = app;