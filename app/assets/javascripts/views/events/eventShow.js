App.Views.EventShowView = Backbone.CompositeView.extend({
  template: JST['events/show'],
  className: 'event-show-container',

  initialize: function () {

    this.listenTo(this.model, "sync", this.render);

    this.model.fetch({
      success: function () {
        this.addMembersIndex(this.model.users());
        this.addCommentsIndex(this.model.comments());
      }.bind(this)
    });

  },

  // content list of comments

  addCommentsIndex: function (commentIndex) {
    var subview = new App.Views.CommentsIndex({ collection: commentIndex });
    this.addSubview('.event-show-comment-list', subview);
  },

  removeCommentsIndex: function (comment) {
    this.removeModelSubview('.event-show-comment-list', comment )
  },

  // content list of members

  addMembersIndex: function (memberIndex) {
    var subview = new App.Views.MembersIndex({ collection: memberIndex });
    this.addSubview('.event-show-user-list', subview);
  },

  removeMembersIndex: function (user) {
    this.removeModelSubview('.event-show-user-list', user )
  },

  // good ol render
  render: function () {
    var content = this.template({ groupEvent: this.model });
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }

})
