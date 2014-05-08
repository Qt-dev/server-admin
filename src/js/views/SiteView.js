var SitesView = Backbone.View.extend({
  el:"body",
  render: function(){
    React.renderComponent(new Content({sites: this.collection, controller: this.controller}), this.el);
  }
});