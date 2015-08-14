App.Views.GroupsIndexItem = Backbone.View.extend({
  template: JST['groups/indexItem'],
  className: "group-item-container",
  initialize: function () {
    this.listenTo(this.model, "add sync remove", this.render);
  },

  render: function () {
    var content = this.template({ group: this.model });
    this.$el.html(content);
    return this;
  }

})
