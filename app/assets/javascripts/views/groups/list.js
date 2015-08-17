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

  render: function () {
    var content = this.template();
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }

})
