App.Views.GroupsListItem = Backbone.View.extend({
  template: JST['groups/listItem'],
  className: "group-item-container",
  initialize: function () {
    this.listenTo(this.model, "add sync remove", this.render);
  },

  render: function () {
    var images = this.model.images().models;
    var length = images.length;
    var content = this.template({
      group: this.model,
      image: images[length - 1]
    });
    this.$el.html(content);
    return this;
  }

})
