App.Views.GroupShowView = Backbone.CompositeView.extend({
  template: JST['groups/show'],
  className: 'group-show-container',

  initialize: function () {

    this.listenTo(this.model.comments(), 'sync', this.render);

    this.listenTo(this.model.users(), 'sync', this.render);

    this.listenTo(this.model, 'sync', this.render);

    this.listenTo(this.model.images(), "sync", this.render);

    this.addingThemSubviews()
  },

  events: {
    "click button.join-group": "joinGroup",
    "click button.leave-group": "leaveGroup",

    "click .start-event-div": "newHuddle",

    "click .group-delete": "deleteGroup",

    "keyup form": "handleKey",
    "submit form": "newComment",
    "click .delete": "deleteComment",

    "click .uploadImage": "uploadImage",
  },

  addingThemSubviews: function () {
    this.model.fetch({
      success: function () {

        this.addCommentsIndex(this.model.comments());

        this.addMembersIndex(this.model.users());

        this.createMembershipCollection();
        this.ableToUploadImage = this.canUpload();

        this.addUpcomingEventsIndex(this.model.upcomingEvents());

        this.addPastEventsIndex(this.model.pastEvents());

      }.bind(this)
    });
  },


  joinGroup: function (e) {
    e.preventDefault();

    if (this.model.users().get(App.CURRENT_USER.id)) {
      console.log('user already joined this group');

    } else {

      var attributes = { user_id: App.CURRENT_USER.id, group_id: this.model.id }

      var groupMember = new App.Models.GroupMember();
      groupMember.set(attributes);

      groupMember.save(attributes, {
        success: function () {
          this.selectedMembers.add(groupMember);

          var user_id = groupMember.attributes.user_id
          var user = new App.Models.User({ id: user_id });

          user.fetch({
            success: function () {
              this.model.users().add(user);
              $("button.join-group").addClass("leave-group").removeClass("join-group").text("Leave this Group");
            }.bind(this)
          })

        }.bind(this)
      });
    }

  },

  leaveGroup: function (e) {
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
    $("button.leave-group").addClass("join-group").removeClass("leave-group").text("Join this Group");
  },

  handleKey: function (event) {
    if (event.keyCode === 13) {
      this.createComment();
    }
  },

  createComment: function () {
    var attributes = $(".comment-form").serializeJSON();
    var comment = new App.Models.Comment();
    comment.set(attributes);
    comment.save(attributes, {
      success: function () {
        comment.set({ author_name: App.CURRENT_USER.username})
        this.model.comments().add(comment);
      }.bind(this)
    });
  },

  newComment: function (e) {
    e.preventDefault();
    var attributes = $(e.currentTarget).serializeJSON();
    var comment = new App.Models.Comment();
    comment.set(attributes);
    comment.save(attributes, {
      success: function () {
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

  deleteGroup: function (e) {
    e.preventDefault();
    this.model.destroy({
      success: function () {
        Backbone.history.navigate("", { trigger: true })
      }
    });
  },

  newHuddle: function (e) {
    e.preventDefault();
    var huddle = new App.Models.Event();
    var modal = new App.Views.HuddleForm({
      model: huddle,
      collection: this.model.upcomingEvents(),
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


  createMembershipCollection: function () {
    this.allMembers = new App.Collections.GroupMembers();

    this.selectedMembers = new App.Collections.GroupMembers();

    var group_id = this.model.id;
    //fetch all the memberships from db
    this.allMembers.fetch({
      success: function () {
        //select membership that has this.model.id
        var models = this.allMembers.select(function (model) {
          return model.get('group_id') === group_id
        });
        //add selected to memberships collection
        models.forEach(function(model) {
          this.selectedMembers.add(model)
        }.bind(this));
        //this.selectedMembers is the Collection
      }.bind(this)
    })
  },

  // Image Upload

  uploadImage: function(e) {
    e.preventDefault();
    var image = new App.Models.Image();
    cloudinary.openUploadWidget(CLOUDINARY_OPTIONS, function(error, result) {
      if (result) {

        var data = result[0];

        var croppedUrl = this.generateCroppedUrl(
          data.url,
          data.public_id,
          data.path,
          data.coordinates.custom[0]
        );

        var thumbCroppedUrl = this.generateThumbCroppedUrl(
          data.url,
          data.public_id,
          data.path,
          data.coordinates.custom[0],
          60,
          60
        );

        image.set({
          url: data.url,
          thumb_url: data.thumbnail_url,
          url_cropped: croppedUrl,
          thumb_url_cropped: thumbCroppedUrl,
          imageable_id: this.model.id,
          imageable_type: "Group",
        });

        image.save({}, {
          success: function() {
            this.model.images().add(image);
          }.bind(this)
        })
      }
    }.bind(this))
  },

  generateCroppedUrl: function (url, publicId, path, coordinates) {
    var head = url.replace(path, "");
    var idx = path.match(publicId).index;
    var tail = path.slice(idx);
    var mid = "x_" + coordinates[0] + ",y_" + coordinates[1] + ",w_" + coordinates[2] + ",h_" + coordinates[3] + ",c_crop/";
    return head + mid + tail
  },

  generateThumbCroppedUrl: function (url, publicId, path, coordinates, thumbWidth, thumbHeight) {
    var head = url.replace(path, "");
    var idx = path.match(publicId).index;
    var tail = path.slice(idx);
    var mid = "x_" + coordinates[0] + ",y_" + coordinates[1] + ",w_" + coordinates[2] + ",h_" + coordinates[3] + ",c_crop/";
    var thumbSize = "w_" + thumbWidth + ",h_" + thumbHeight + ",c_fill/"
    return head + mid + thumbSize + tail
  },

  canUpload: function () {
    var result = false;
    this.model.users().models.forEach(function(user){
      if (user.id === App.CURRENT_USER.id) {
        result = true;
      }
    }.bind(this))
    return result;
  },

  // good ol render
  render: function () {
    var existance = this.model.users().get(App.CURRENT_USER.id);
    var content = this.template({
      group: this.model,
      group_id: this.model.id,
      user_list: this.model.users(),
      images: this.model.images(),
      ableToUploadImage: this.ableToUploadImage,
    });
    this.$el.html(content);

    this.attachSubviews();
    return this;
  },


})
