var Sites = Backbone.Collection.extend({
  model: Site,
  url: '/sites',
  initialize: function(){
    this.bind('remove', this.onModelRemoved, this);
  },
  render: function(){
    if(!(this.view)){
      this.view = new SitesView({collection: this});
      this.view.controller = this.controller;
    }
    this.view.render();
  }
});