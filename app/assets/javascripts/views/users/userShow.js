App.Views.UserShowView = Backbone.CompositeView.extend({
  template: JST['users/show'],
  className: 'user-show-container',

  initialize: function () {

    this.listenTo(this.model, "sync", this.render);

    this.listenTo(this.model.comments(), "sync", this.render);
    
    this.addingThemSubviews();

  },

  addingThemSubviews: function () {
    this.model.fetch({
      success: function () {
        this.addGroupsIndex(this.model.groups());
        this.addUpcomingEventsIndex(this.model.upcomingEvents());        this.addPastEventsIndex(this.model.pastEvents());
        this.addCommentsIndex(this.model.comments());
      }.bind(this)
    });
  },

  events: {
    "submit form": "newComment",
    "click .delete": "deleteComment",
  },

  newComment: function (e) {
    e.preventDefault();
    var attributes = $(e.currentTarget).serializeJSON();
    var comment = new App.Models.Comment();
    comment.set(attributes);
    comment.save(attributes, {
      success: function () {
        console.log(comment.attributes);
        comment.set({ author_name: App.CURRENT_USER.username})
        this.model.comments().add(comment);
      }.bind(this)
    });
  },

  deleteComment: function (e) {

    e.preventDefault();
    var $button = $(e.currentTarget)
    var comment = this.model.comments().get($button.attr("data-id"));
    comment.destroy();
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
    var content = this.template({
      user: this.model,
      user_id: this.model.id,
    });
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }

})
