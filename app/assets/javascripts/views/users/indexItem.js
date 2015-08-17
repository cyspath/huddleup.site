App.Views.MembersIndexItem = Backbone.View.extend({
  template: JST['users/indexItem'],
  className: "user-item-container",

  initialize: function () {
    this.listenTo(this.model, "add sync remove", this.render);
  },

  render: function () {
    var content = this.template({ user: this.model });
    this.$el.html(content);
    return this;
  }

})
