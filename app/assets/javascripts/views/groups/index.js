App.Views.GroupsIndex = Backbone.CompositeView.extend({
  template: JST['groups/index'],

  initialize: function () {
  //
    this.listenTo(this.collection, "add", this.addGroupView);

    this.listenTo(this.collection, "remove", this.removeGroupView);

    this.listenTo(this.collection, "sync", this.render);

    this.collection.each(this.addGroupView.bind(this));
  },

  addGroupView: function (group) {
    var subview = new App.Views.GroupsIndexItem({ model: group });
    this.addSubview('.groups-index-container', subview);
  },

  removeGroupView: function (group) {
    this.removeModelSubview('.groups-index-container', group)
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }

})
