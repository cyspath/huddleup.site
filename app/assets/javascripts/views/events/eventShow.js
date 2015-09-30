App.Views.EventShowView = Backbone.CompositeView.extend({
  template: JST['events/show'],
  className: 'event-show-container outer-container',

  initialize: function (options) {

    this.setVisited();

    this.funnyPhrase = options.funnyPhrase;

    this.listenTo(this.model, "sync", this.render);

    this.listenTo(this.model.comments(), "sync", this.renderScrollDown);

    this.listenTo(this.model.users(), 'sync remove', this.checkCanUploadAndRender);

    this.listenTo(this.model.images(), "sync", this.render);

    this.addingThemSubviews();

  },

  events: {
    "click button.join-event": "joinEvent",
    "click button.leave-event": "leaveEvent",

    "click .event-delete": "deleteEvent",

    "keyup form": "handleKey",
    "submit form": "newComment",
    "click .comment-delete-btn": "deleteComment",

    "click .uploadImage": "uploadImage",
  },

  setVisited: function () {
    if (this.model.attributes.visited == undefined) {
      this.model.set({ "visited": 1 })
    } else {
      this.model.attributes.visited += 1
    }
    console.log('number of times visited this group: ' + this.model.attributes.visited);
  },

  spinnerFadeOut: function () {

    setTimeout(function(){
      $('.spinner-right-bar').fadeOut()
      $('.spinner-left-bar').fadeOut()
      $('.spinner-mid-bar-bottom').fadeOut()
    },0)
  },

  addingThemSubviews: function () {

    if (this.model.attributes.title == undefined) {
      this.model.fetch({
        success: function () {

          this.addMembersIndex(this.model.users());

          this.ableToUploadImage = this.canUpload();

          this.createMembershipCollection();

          this.addCommentsIndex(this.model.comments());

        }.bind(this)
      });
    } else {
      this.addMembersIndex(this.model.users());

      this.ableToUploadImage = this.canUpload();

      this.createMembershipCollection();

      this.addCommentsIndex(this.model.comments());

    }

  },


  // join and leave a Huddle event

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

  // Comments - create/delete/submit

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
        comment.fetch({
          success: function () {
            this.model.comments().add(comment);
          }.bind(this)
        })
      }.bind(this)
    });
  },

  newComment: function (e) {
    e.preventDefault();
    var attributes = $(e.currentTarget).serializeJSON();
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

  // Events - delete

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
          imageable_type: "Event",
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

  checkCanUploadAndRender: function () {
    this.ableToUploadImage = this.canUpload();
    this.render();
  },

  getSlideShowImages: function () {
    //shuffle collection
    var newCollection = this.model.images().reset(this.model.images().shuffle(), {silent:true});
    return newCollection;
  },

  // for commenting, page after will stay at bottom
  renderScrollDown: function () {

    var group = this.model.group().models[0];

    var shuffled = this.getSlideShowImages();
    var content = this.template({
      groupEvent: this.model,
      event_id: this.model.id,
      slideShowImages: shuffled,
      ableToUploadImage: this.ableToUploadImage,
      funnyPhrase: this.funnyPhrase,
      group: group,
    });

    this.$el.html(content);
    this.attachSubviews();
    //set timeago
    jQuery("abbr.timeago").timeago();
    $('html, body').scrollTop($(document).height())
    return this;
  },
  // good ol render
  render: function () {

    var group = this.model.group().models[0];

    var shuffled = this.getSlideShowImages();
    var content = this.template({
      groupEvent: this.model,
      event_id: this.model.id,
      slideShowImages: shuffled,
      ableToUploadImage: this.ableToUploadImage,
      funnyPhrase: this.funnyPhrase,
      group: group,
      visited: this.model.attributes.visited,
    });

    this.$el.html(content);
    this.attachSubviews();
    //set timeago
    jQuery("abbr.timeago").timeago();

    $('img').load(function() {
      this.spinnerFadeOut()
    }.bind(this))

    return this;
  }

})
