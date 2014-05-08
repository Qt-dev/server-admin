var Controller = function(opts){
  this.sites = opts.sites;
  this.categories = opts.categories;

  this.sites.controller = this;
  this.categories.controller = this;
};

Controller.prototype = {
  initialize: function(){
    this.sites.fetch();
    this.categories.fetch();
  },  
  getCategory: function(id){
    return this.categories.get(id);
  }
};