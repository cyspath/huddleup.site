App.Routers.Router = Backbone.Router.extend({

  initialize: function (options) {
    this.$el = options.$rootEl;
    this.groups = new App.Collections.Groups();
    this.allEvents = new App.Collections.Events();
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

    "users/:id": "showUser",

    "comments/new": "newEvent",

    "blank": "blankPage",
  },

  swapView: function (view) {
    this.currentView && this.currentView.remove();
    this.currentView = view;
    this.$el.html(view.render().$el);
  },

  AllGroups: function () {
    this.groups.fetch({
      success: function () {
        this.allEvents.fetch({
          success: function () {
            var view = new App.Views.GroupsList({
              collection: this.groups,
              allEvents: this.allEvents
            });
            this.swapView(view);
          }.bind(this)
        });

      }.bind(this)
    });
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
    //scroll top (not needed since modal is fixed pos now)
    // $("body").animate({ scrollTop: 0 }, "slow");
    modal.render();
    // set faded-background height
    $('.faded-background').height($(document).height());
  },

  showEvent: function (id) {
    var groupEvent = this.allEvents.getOrFetch(id);
    var view = new App.Views.EventShowView({
      model: groupEvent,
      funnyPhrase: App.FunnyPhrases()
    });
    this.swapView(view);
  },

  showUser: function (id) {
    var user = this.users.getOrFetch(id);
    // var user = new App.Models.User({id: id})
    var view = new App.Views.UserShowView({ model: user });
    this.swapView(view);
  },

  blankPage: function () {
    console.log("rerendering");
  }

});
