App.Views.UserShowView = Backbone.CompositeView.extend({
  template: JST['users/show'],
  className: 'user-show-container outer-container',

  initialize: function () {
    this.loaded = false;

    this.tallyRating();

    this.listenTo(this.model, "add sync change remove", this.render);

    this.listenTo(this.model.comments(), "sync", this.renderScrollDown);

    this.listenTo(this.model.images(), "sync", this.renderOrRefresh);


    this.addingThemSubviews();

  },

  events: {
    "keyup form": "handleKey",

    "submit form": "newComment",
    "click .comment-delete-btn": "deleteComment",

    "click .uploadImage-user": "uploadImage",

    "click .btn-edit": "updateProfileInfo",

    "click .submit-rating": "submitRating",
  },

  spinnerFadeOut: function () {
    this.loaded = true;
    setTimeout(function(){
      $('.spinner-right-bar').fadeOut()
      $('.spinner-left-bar').fadeOut()
      $('.spinner-mid-bar-bottom').fadeOut()
    },0)
  },

  addingThemSubviews: function () {
    // if already fetched before, and is in collection, got passed in, then just add subviews. Else, fetch model and add subviews
    if (this.model.attributes.username == undefined) {
      // fetch and add subviews
      this.model.fetch({
        success: function () {

          // this.addImagesIndex(this.model.images());

          this.addGroupsIndex(this.model.groups());

          this.addUpcomingEventsIndex(this.model.upcomingEvents());

          this.addPastEventsIndex(this.model.pastEvents());

          this.addCommentsIndex(this.model.comments());

          this.spinnerFadeOut();

        }.bind(this)
      });

    } else {
      // just add subviews
      this.addGroupsIndex(this.model.groups());

      this.addUpcomingEventsIndex(this.model.upcomingEvents());

      this.addPastEventsIndex(this.model.pastEvents());

      this.addCommentsIndex(this.model.comments());

      this.spinnerFadeOut();

    }

  },


  handleKey: function (event) {
    if (event.keyCode === 13) {
      this.createComment();
    }
  },

  updateProfileInfo: function (e) {
    e.preventDefault();
    var modal = new App.Views.UserForm({
      model: this.model,
    });

    $('body').prepend(modal.$el);
    //slow scroll to top
    // $("body").animate({ scrollTop: 0 }, "slow");
    modal.render();
    // set faded-background height
    $('.faded-background').height($(document).height());

  },

  submitRating: function (e) {
    e.preventDefault();
    var attributes = $('.rating-form').serializeJSON()

    // remove button only if user have choosen an option
    if (!attributes.score === false) {
      var newRating = new App.Models.Rating();
      newRating.set(attributes);
      this.afterVoteDomModification();
    } else {
      console.log("Please choose a rating option");
      return null;
    }


    newRating.save(attributes, {
      success: function () {
        $('.post-rate-msg').text("Thank you for letting us know!")
        $('.post-rate-msg').addClass('animated fadeIn');
        $('.post-rate-msg').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', this.fadeOut);

      }.bind(this)
    });
  },

  afterVoteDomModification: function () {
    $('.submit-rating').remove();
    var oldCount = $('.count-num').text();
    var newCount = parseInt(oldCount) + 1
    $('.count-num').text(newCount)
    if (newCount == 1) {
      $('.count-votes').text("vote")
    }
    $('.pre-rate-msg').remove()
  },

  fadeOut: function () {
    $('.post-rate-msg').addClass('animated fadeOut');
  },

  tallyRating: function () {
    this.ratingsCollection = new App.Collections.Ratings();

    this.ratingCount = 0;

    this.ratingsCollection.fetch({
      success: function () {
        var sum = 0;
        var count = 0;
        this.alreadyRated = false;

        this.ratingsCollection.each(function(rating){
          var score = parseInt(rating.escape('score'));
          if (rating.escape('rateable_id') == this.model.id) {
            sum += score;
            count += 1;
          }
          if (rating.escape('voter_id') == App.CURRENT_USER.id && rating.escape('rateable_id') == this.model.id) {
            this.alreadyRated = true;
          }
          this.ratingCount = count; //total num of ratings
        }.bind(this))

        this.rating = Math.round(sum/count); //average rating

      }.bind(this)
    })
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

  renderOrRefresh: function () {
    if (this.model.images().length == 1) {
      location.reload();
    } else {
      this.render();
    }
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


  renderScrollDown: function () {
    var content = this.template({
      user: this.model,
      user_id: this.model.id,
      images: this.model.images(),
      ratingCount: this.ratingCount,
      alreadyRated: this.alreadyRated,
    });
    this.$el.html(content);
    this.attachSubviews();

    //and set the current rating of the user
    $('select#rating').barrating('set', this.rating);
    //set timeago
    jQuery("abbr.timeago").timeago();
    $('html, body').scrollTop($(document).height())
    return this;
  },
  // good ol render
  render: function () {

    var content = this.template({
      user: this.model,
      user_id: this.model.id,
      images: this.model.images(),
      ratingCount: this.ratingCount,
      alreadyRated: this.alreadyRated,
      loaded: this.loaded,
    });
    this.$el.html(content);
    this.attachSubviews();

    //and set the current rating of the user
    $('select#rating').barrating('set', this.rating);
    //set timeago
    jQuery("abbr.timeago").timeago();

    return this;
  },



})
