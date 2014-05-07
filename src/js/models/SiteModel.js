var Site = Backbone.Model.extend({
  url: '/sites',
  initialize: function(){
    this.queryUrl = '/'+this.get('type')+'/query';
    this.config = this.get('config');
  },
  query: function(action, callback){
    if(this.get('type')){
      var config = this.config;
      config.action = action;

      var data = {
        url: this.queryUrl,
        datatype: 'json',
        data: config
      };

      AJAX.request(data, callback, function(error){console.log(error);});
    }
  }
});