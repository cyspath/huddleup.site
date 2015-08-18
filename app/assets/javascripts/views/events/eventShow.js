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

        this.createMembershipCollection();

        this.addCommentsIndex(this.model.comments());

      }.bind(this)
    });
  },


  events: {
    "click button.join-event": "joinEvent",
    "click button.leave-event": "leaveEvent",

    "click .event-delete": "deleteEvent",

    "submit form": "newComment",
    "click .delete": "deleteComment",
  },

  joinEvent: function (e) {
    e.preventDefault();

    if (this.model.users().get(App.CURRENT_USER.id)) {
      console.log('user already attending');

    } else {

      var attributes = { user_id: App.CURRENT_USER.id, event_id: this.model.id }

      var eventMember = new App.Models.EventMember();
      eventMember.set(attributes);

      eventMember.save(attributes, {
        success: function () {
          this.selectedMembers.add(eventMember);

          var user_id = eventMember.attributes.user_id
          var user = new App.Models.User({ id: user_id });

          user.fetch({
            success: function () {
              this.model.users().add(user);
                $("button.join-event").addClass("leave-event").removeClass("join-event").text("Leave this Huddle");
            }.bind(this)
          })

        }.bind(this)
      });
    }

  },

  leaveEvent: function (e) {
    e.preventDefault();
    this.selectedMembers.each(function(membership){
      if (membership.get('user_id') === App.CURRENT_USER.id) {
        this.currentUserMembership = membership;
      }
    }.bind(this))
    //delete membership from db and collection
    this.currentUserMembership.destroy();
    //remove user from user collection
    this.model.users().remove(App.CURRENT_USER.id);
    //change button to join
    $("button.leave-event").addClass("join-event").removeClass("leave-event").text("Join this Huddle");
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

  createMembershipCollection: function () {
    this.allMembers = new App.Collections.EventMembers();

    this.selectedMembers = new App.Collections.EventMembers();

    var event_id = this.model.id;
    //fetch all the memberships from db
    this.allMembers.fetch({
      success: function () {
        //select membership that has this.model.id
        var models = this.allMembers.select(function (model) {
          return model.get('event_id') === event_id
        });
        //add selected to memberships collection
        models.forEach(function(model) {
          this.selectedMembers.add(model)
        }.bind(this));
        //this.selectedMembers is the Collection
      }.bind(this)
    })
  },

  // good ol render
  render: function () {
    var content = this.template({ groupEvent: this.model, event_id: this.model.id });
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }

})
