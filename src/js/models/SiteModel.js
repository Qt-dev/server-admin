var Site = Backbone.Model.extend({
  url: '/sites',
  initialize: function(){
    this.queryUrl = '/'+this.get('type')+'/query';
    this.config = this.get('config');
  },
  query: function(action, callback, params){
    if(this.get('type')){
      var sentData = {
        config: this.config,
        params: params,
        action: action
      };

      var data = {
        url: this.queryUrl,
        datatype: 'json',
        data: sentData
      };

      AJAX.request(data, callback, function(error){console.log(error);});
    }
  }
});