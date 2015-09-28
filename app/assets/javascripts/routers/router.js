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
    "groups/:id": "showGroup",

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

    if (this.home_page_visited == undefined) {
      //fetch the partial groups and partial events for the home page showing
      this.groups.fetch({
        success: function () {
          this.allEvents.fetch({
            success: function () {
              this.home_page_visited = true;
              var view = new App.Views.GroupsList({
                collection: this.groups,
                allEvents: this.allEvents
              });
              this.swapView(view);
            }.bind(this)
          })

        }.bind(this)
      });
    } else {
      //use existing collection
      var view = new App.Views.GroupsList({
        collection: this.groups,
        allEvents: this.allEvents
      });
      this.swapView(view);
    }

  },

  showGroup: function (id) {
    $(window).scrollTop(0)
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
    $(window).scrollTop(0)

    var groupEvent = this.allEvents.getOrFetch(id);
    var view = new App.Views.EventShowView({
      model: groupEvent,
      funnyPhrase: App.FunnyPhrases()
    });
    this.swapView(view);
  },

  showUser: function (id) {
    $(window).scrollTop(0)

    var user = this.users.getOrFetch(id);
    // var user = new App.Models.User({id: id})
    var view = new App.Views.UserShowView({ model: user });
    this.swapView(view);
  },

  blankPage: function () {
    console.log("rerendering");
  }

});
