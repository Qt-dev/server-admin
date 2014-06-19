var express = require('express');
var bodyParser = require('body-parser')

// Global requirements
global.fs = require('fs');
global.tungus = require('tungus');
global.mongoose = require('mongoose');
global.Schema = mongoose.Schema;

// Config
var config = {
  port: 3000
};

var app = express();

app.use(bodyParser.json());
// Prepare the router
var router = require(__dirname + '/config/routes');
app.use('/',router);

// Prepare the db
var db = require(__dirname + '/config/db');
db.start();

// Load models
var models_path = __dirname + '/app/models'
fs.readdirSync(models_path).forEach(function (file) {
  if (~file.indexOf('.js')) {
    require(models_path + '/' + file)
  }
})

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