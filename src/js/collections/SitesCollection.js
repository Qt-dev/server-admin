var Sites = Backbone.Collection.extend({
  model: Site,
  url: '/sites',
  render: function(){
    if(!(this.view)){
      this.view = new SitesView({collection: this});
      this.view.controller = this.controller;
    }
    this.view.render();
  }
});