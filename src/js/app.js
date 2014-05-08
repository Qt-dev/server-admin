App = {};
window.onload = function(){
  App.sites = new Sites();
  App.categories = new Categories();

  App.sites.fetch();
  App.categories.fetch();
};