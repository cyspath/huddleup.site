App.Views.GroupShowView = Backbone.CompositeView.extend({
  template: JST['groups/show'],
  className: 'group-show-container',

  initialize: function () {
    // this.listenTo(this.collection, "add", this.addGroupView);
    //
    // this.listenTo(this.collection, "remove", this.removeGroupView);
    //
    this.listenTo(this.model, "sync", this.render);
    //
    // this.collection.each(this.addGroupView.bind(this));
  },

  addEventsView: function (group) {
    var subview = new App.Views.GroupsIndexItem({ model: group });
    this.addSubview('.groups-container', subview);
  },

  removeUsersView: function (group) {
    this.removeModelSubview('.groups-container', group)
  },

  render: function () {
    var content = this.template({ group: this.model });
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }

})
