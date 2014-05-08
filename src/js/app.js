App = {};
window.onload = function(){
  App.sites = new Sites();
  App.categories = new Categories();

  App.controller = new Controller({
    sites: App.sites,
    categories: App.categories
  });
  App.controller.initialize();
};