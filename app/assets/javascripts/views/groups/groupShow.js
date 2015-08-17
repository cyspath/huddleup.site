App.Views.GroupShowView = Backbone.CompositeView.extend({
  template: JST['groups/show'],
  className: 'group-show-container',

  initialize: function () {

    this.listenTo(this.model.comments(), 'sync', this.render)

    this.listenTo(this.model.events(), 'add sync change remove', this.render)

    this.addingThemSubviews()
  },


  addingThemSubviews: function () {
    this.model.fetch({
      success: function () {
        this.addCommentsIndex(this.model.comments());
        this.addMembersIndex(this.model.users());
        // this.addEventsIndex(this.model.events());
        this.addUpcomingEventsIndex(this.model.upcomingEvents());        this.addPastEventsIndex(this.model.pastEvents());
      }.bind(this)
    });
  },

  events: {
    "click .start-event-div": "newHuddle",
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

  newHuddle: function (e) {
    e.preventDefault();
    var huddle = new App.Models.Event();
    var modal = new App.Views.HuddleForm({
      model: huddle,
      collection: this.model.events(),
      group_id: this.model.id
    });

    $('body').prepend(modal.$el);
    modal.render();
  },

  // content list of upcoming events

  addUpcomingEventsIndex: function (eventsIndex) {
    var subview = new App.Views.EventsIndex({ collection: eventsIndex });
    // $('.group-show-upcoming-events').empty();
    this.addSubview('.group-show-upcoming-events', subview);
  },

  removeUpcomingEventsIndex: function (groupEvent) {
    this.removeModelSubview('.group-show-upcoming-events', groupEvent )
  },

  // content list of past events

  addPastEventsIndex: function (eventsIndex) {
    var subview = new App.Views.EventsIndex({ collection: eventsIndex });
    this.addSubview('.group-show-past-events', subview);
  },

  removePastEventsIndex: function (groupEvent) {
    this.removeModelSubview('.group-show-past-events', groupEvent )
  },


  // content list of comments

  addCommentsIndex: function (commentIndex) {
    var subview = new App.Views.CommentsIndex({ collection: commentIndex });
    this.addSubview('.group-show-comment-list', subview);
  },

  removeCommentsIndex: function (comment) {
    this.removeModelSubview('.group-show-comment-list', comment )
  },

  // content list of members

  addMembersIndex: function (memberIndex) {
    var subview = new App.Views.MembersIndex({ collection: memberIndex });
    this.addSubview('.group-show-user-list', subview);
  },

  removeMembersIndex: function (user) {
    this.removeModelSubview('.group-show-user-list', user )
  },

  // good ol render
  render: function () {
    var content = this.template({
      group: this.model,
      group_id: this.model.id,
    });
    this.$el.html(content);

    this.attachSubviews();
    return this;
  },

  // content list of ALL events

  // addEventsIndex: function (eventsIndex) {
  //   var subview = new App.Views.EventsIndex({ collection: eventsIndex });
  //   this.addSubview('.group-show-upcoming-events', subview);
  // },
  //
  // removeUpcomingEventsIndex: function (groupEvent) {
  //   this.removeModelSubview('.group-show-upcoming-events', groupEvent )
  // },
})