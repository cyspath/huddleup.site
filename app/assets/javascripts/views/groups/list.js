App.Views.GroupsList = Backbone.CompositeView.extend({
  template: JST['groups/list'],

  initialize: function () {
  //
    this.listenTo(this.collection, "add", this.addGroupView);

    this.listenTo(this.collection, "remove", this.removeGroupView);

    this.listenTo(this.collection, "sync", this.render);

    this.collection.each(this.addGroupView.bind(this));
  },

  addGroupView: function (group) {
    var subview = new App.Views.GroupsListItem({ model: group });
    this.addSubview('.groups-container', subview);
  },

  removeGroupView: function (group) {
    this.removeModelSubview('.groups-container', group)
  },

  getSlideShowImages: function () {
    //shuffle collection - disabled
    // var newCollection = this.collection.reset(this.collection.shuffle(), {silent:true});

    this.slideShowImages = [];
    this.ollection.forEach(function(group){
      var images = group.images().models;
      var length = images.length;
      this.slideShowImages.push(images[length - 1])
    }.bind(this))

  },

  render: function () {

    // get am array of slide show pics from groups and also remove the undefined from the array, shuffle
    // this.getSlideShowImages();


    var content = this.template({
      slideShowImages: shuffled
    });
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }

})
