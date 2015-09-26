window.App = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    new App.Routers.Router({
      $rootEl: $('#root')
    });
    Backbone.history.start();
  }
};
