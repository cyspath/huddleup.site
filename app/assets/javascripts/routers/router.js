App.Routers.Router = Backbone.Router.extend({

  initialize: function (options) {
    this.$el = options.$rootEl;
    this.groups = new App.Collections.Groups();
  },

  routes: {
    "": "AllGroups",
    "groups/new": "newGroup",
    "groups/:id/edit": "editGroup",
    "groups/:id": "showGroup",

    "events": "AllEvents",
    "events/new": "newEvent",
    "events/:id/edit": "editEvent",
    "events/:id": "showEvent",

    "users": "AllUsers",
    "users/:id/edit": "editUser",
    "users/:id": "showUser",

    "comments": "AllComments",
    "comments/new": "newEvent",
  },

  swapView: function (view) {
    this.currentView && this.currentView.remove();
    this.currentView = view;
    this.$el.html(view.render().$el);
  },

  AllGroups: function () {
    this.groups.fetch();
    var view = new App.Views.GroupsIndex({ collection: this.groups });
    this.swapView(view);
  },

  newGroup: function () {
    var group = new App.Models.Group();
    var view = new App.Views.GroupForm({ model: group, collection: this.groups });
    this.swapView(view);
  }

});
