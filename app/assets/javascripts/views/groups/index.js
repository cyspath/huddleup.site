App.Views.GroupsIndex = Backbone.CompositeView.extend({
  template: JST['groups/index'],
  className: 'groups-container group',

  initialize: function () {
    this.listenTo(this.collection, "add change remove", this.render);
    this.listenTo(this.collection, "sync", this.render);
  },

  render: function () {
    var content = this.template({ groups: this.collection });
    this.$el.empty();
    this.collection.each(function(group){
      var view = new App.Views.GroupsIndexItem({ model: group });
      this.$el.append(view.render().$el)
    }.bind(this))

    return this;
  }

})
