var Sites = Backbone.Collection.extend({
  model: Site,
  url: '/sites',
  initialize: function(){
    this.view = new SitesView({collection: this});
    this.view.render();
  }
});