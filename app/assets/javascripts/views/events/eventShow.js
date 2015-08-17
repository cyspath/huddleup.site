App.Views.EventShowView = Backbone.CompositeView.extend({
  template: JST['events/show'],
  className: 'event-show-container',

  initialize: function () {

    this.listenTo(this.model, "sync", this.render);

    this.listenTo(this.model.comments(), "sync", this.render);

    this.addingThemSubviews();

  },

  addingThemSubviews: function () {
    this.model.fetch({
      success: function () {
        this.addMembersIndex(this.model.users());
        this.addCommentsIndex(this.model.comments());
      }.bind(this)
    });
  },


  events: {
    "click button.going-not-going": "setAttendingStatus",
    "click .event-delete": "deleteEvent",
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

  setAttendingStatus: function (e) {
    e.preventDefault();

    if (this.model.users().get(App.CURRENT_USER.id)) {

      console.log('user already attending');

    } else {

      var attributes = { user_id: App.CURRENT_USER.id, event_id: this.model.id }

      var eventMember = new App.Models.EventMember();
      eventMember.set(attributes);

      eventMember.save(attributes, {
        success: function () {
          console.log(eventMember.attributes);
          var user_id = eventMember.attributes.user_id
          var user = new App.Models.User({ id: user_id });

          user.fetch({
            success: function () {
              this.model.users().add(user)
            }.bind(this)
          })

        }.bind(this)
      });
    }

  },

  deleteEvent: function (e) {
    e.preventDefault();
    this.model.destroy({
      success: function () {
        Backbone.history.navigate("", { trigger: true })
      }
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
    var content = this.template({ groupEvent: this.model, event_id: this.model.id });
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }

})
