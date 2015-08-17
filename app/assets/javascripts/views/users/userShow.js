App.Views.UserShowView = Backbone.CompositeView.extend({
  template: JST['users/show'],
  className: 'user-show-container',

  initialize: function () {

    this.listenTo(this.model, "sync", this.render);

    this.model.fetch({
      success: function () {
        this.addGroupsIndex(this.model.groups());
        this.addUpcomingEventsIndex(this.model.upcomingEvents());        this.addPastEventsIndex(this.model.pastEvents());
        this.addCommentsIndex(this.model.comments());

      }.bind(this)
    });

  },

  // content list of groups

  addGroupsIndex: function (groupsIndex) {
    var subview = new App.Views.GroupsIndex({ collection: groupsIndex });
    this.addSubview('.user-show-group-list', subview);
  },

  removeGroupsIndex: function (group) {
    this.removeModelSubview('.user-show-group-list', group )
  },

  // content list of upcoming events

  addUpcomingEventsIndex: function (eventsIndex) {
    var subview = new App.Views.EventsIndex({ collection: eventsIndex });
    this.addSubview('.user-show-upcoming-events', subview);
  },

  removeUpcomingEventsIndex: function (groupEvent) {
    this.removeModelSubview('.user-show-upcoming-events', groupEvent )
  },

  // content list of past events

  addPastEventsIndex: function (eventsIndex) {
    var subview = new App.Views.EventsIndex({ collection: eventsIndex });
    this.addSubview('.user-show-past-events', subview);
  },

  removePastEventsIndex: function (groupEvent) {
    this.removeModelSubview('.user-show-past-events', groupEvent )
  },

  // content list of comments

  addCommentsIndex: function (commentIndex) {
    var subview = new App.Views.CommentsIndex({ collection: commentIndex });
    this.addSubview('.user-show-comment-list', subview);
  },

  removeCommentsIndex: function (comment) {
    this.removeModelSubview('.user-show-comment-list', comment )
  },

  // good ol render
  render: function () {
    var content = this.template({ user: this.model });
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }

})
