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

  var _model = mongoose.model('Site', siteSchema);

  return {
    schema: siteSchema,
    model: _model
  }
}();

module.exports = Site;