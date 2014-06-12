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
    this.bind();
  },
  bind: function(){
    this.categories.on('change', this.sites.render.bind(this.sites));
    this.categories.on('add', this.sites.render.bind(this.sites));
  },
  getCategory: function(idName){
    return this.categories.where({idName: idName})[0];
  }
};