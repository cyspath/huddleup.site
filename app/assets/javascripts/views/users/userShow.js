App.Views.UserShowView = Backbone.CompositeView.extend({
  template: JST['users/show'],
  className: 'user-show-container outer-container',

  initialize: function () {

    this.listenTo(this.model, "sync", this.render);

    this.listenTo(this.model.comments(), "sync", this.render);

    this.listenTo(this.model.images(), "sync", this.render);

    this.addingThemSubviews();

  },

  events: {
    "keyup form": "handleKey",
    "submit form": "newComment",
    "click .comment-delete-btn": "deleteComment",
    "click .uploadImage": "uploadImage",
  },


  addingThemSubviews: function () {
    this.model.fetch({
      success: function () {

        // this.addImagesIndex(this.model.images());

        this.addGroupsIndex(this.model.groups());

        this.addUpcomingEventsIndex(this.model.upcomingEvents());

        this.addPastEventsIndex(this.model.pastEvents());

        this.addCommentsIndex(this.model.comments());

      }.bind(this)
    });
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
          imageable_id: App.CURRENT_USER.id,
          imageable_type: "User",
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


  // good ol render
  render: function () {
    var content = this.template({
      user: this.model,
      user_id: this.model.id,
      images: this.model.images(),
    });
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }

})
