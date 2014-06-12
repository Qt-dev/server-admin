var Site = Backbone.Model.extend({
  url: '/sites',
  initialize: function(){
    this.queryUrl = '/apis/query';
    this.config = this.get('config');
    var categories = this.collection.controller.categories;
    this.category = categories.where({id: this.get('category').id})[0];
  },
  query: function(action, callback, params){
    if(this.get('type')){
      var sentData = {
        config: this.config,
        app: this.get('type'),
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