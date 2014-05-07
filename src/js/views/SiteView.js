var SitesView = Backbone.View.extend({
  el:"body",
  render: function(){
    React.renderComponent(new Content({sites: this.collection}), this.el);
  }
});