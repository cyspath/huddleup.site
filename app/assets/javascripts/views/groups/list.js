App.Views.GroupsList = Backbone.CompositeView.extend({
  template: JST['groups/list'],

  initialize: function (options) {

    this.allEvents = options.allEvents,

    this.listenTo(this.collection, "add", this.addGroupView);

    this.listenTo(this.collection, "remove", this.removeGroupView);

    this.listenTo(this.collection, "sync", this.render);

    this.collection.each(this.addGroupView.bind(this));
  },

  events: {
    "keyup input": "handleKey",
  },

  handleKey: function (e) {
    if (e.keyCode === 13) {
      this.search(e);
    }
  },

  search: function (e) {
    e.preventDefault()
    if ($("input[type=text]").val() != "") {
      var name = $("input[type=text]").val();
    } else {
      console.log("Search area empty")
      return null
    }

    this.allEvents = new App.Collections.Events()
    this.allEvents.fetch({
      success: function () {
        this.users = new App.Collections.Users();
        this.users.fetch({
          success: function () {

            var modal = new App.Views.SearchForm({
              groups: this.collection,
              allEvents: this.allEvents,
              users: this.users,
              searchString: name,
            });

            $('body').prepend(modal.$el);
            //slow scroll to top
            $("body").animate({ scrollTop: 0 }, "slow");
            modal.render();
            // set faded-background height
            $('.faded-background').height($(document).height());

          }.bind(this)
        })
      }.bind(this)
    })

  },

  addGroupView: function (group) {
    var subview = new App.Views.GroupsListItem({ model: group });
    this.addSubview('.groups-container', subview);
  },

  removeGroupView: function (group) {
    this.removeModelSubview('.groups-container', group)
  },

  getSlideShowImages: function () {
    var events = this.allEvents.models
    var images = []
    events.forEach(function(event){
      if (event.images() && event.images().length != 0) {
        var length = event.images().length
        var models = event.images().models
        images.push(models[length-1])
      }
      // don't over load images, max 20 slides
      if (images.length >= 20) {
        return images;
      }
    }.bind(this))
    return images;
  },

  countGroups: function () {
    if (this.collection) {
      return this.collection.length
    } else {
      return null
    }
  },

  render: function () {
    var content = this.template({
      groupCount: this.countGroups(),
      eventCount: this.allEvents.length,
      slideShowImages: this.getSlideShowImages()
    });
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }

})
