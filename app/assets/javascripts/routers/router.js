App.Routers.Router = Backbone.Router.extend({

  initialize: function (options) {
    this.$el = options.$rootEl;
    this.groups = new App.Collections.Groups();
    this.events = new App.Collections.Events();
    this.users = new App.Collections.Users();
  },

  routes: {
    "": "AllGroups",
    "groups/new": "newGroup",
    // "groups/:id/edit": "editGroup",
    "groups/:id": "showGroup",

    // "events": "AllEvents",
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
    var view = new App.Views.GroupsList({ collection: this.groups });
    this.swapView(view);
  },

  showGroup: function (id) {
    var group = this.groups.getOrFetch(id);
    var view = new App.Views.GroupShowView({ model: group });
    this.swapView(view);
  },

  newGroup: function () {
    var group = new App.Models.Group();
    var modal = new App.Views.GroupForm({ model: group, collection: this.groups });
    $('body').prepend(modal.$el);
    modal.render();
  },

  showEvent: function (id) {
    var groupEvent = this.events.getOrFetch(id);
    var view = new App.Views.EventShowView({ model: groupEvent });
    this.swapView(view);
  },

  showUser: function (id) {
    var user = this.users.getOrFetch(id);
    var view = new App.Views.UserShowView({ model: user });
    this.swapView(view);
  },


});
