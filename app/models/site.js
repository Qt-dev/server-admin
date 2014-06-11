var Category = require('./category');

var Config = function(){
  var configSchema = new Schema({
    url: {type: String, required: true},
    apiKey: {type: String},
    host: {type: String},
    port: {type: String},
    username: {type: String},
    password: {type: String}
  })

  var _model = mongoose.model('Config', configSchema);

  return {
    schema: configSchema,
    model: _model
  }
}()

var Site = function(){
  var siteSchema = new Schema({
    title: {type: String},
    type: {type: String},
    description: {type: String},
    category: {type: Category},
    config: {type: Config}
  })
  siteSchema.path('title').required(true, 'A site cannot have an empty title');
  
  var _model = mongoose.model('Site', siteSchema);

  var _findAll = function(callback){
    _model.find({}, function(err,sites){
      sites = sites.map(function(site){
        return site
      });
      callback(err,sites)
    });
  }

  return {
    schema: siteSchema,
    model: _model,
    findAll: _findAll
  }
}();

module.exports = Site;