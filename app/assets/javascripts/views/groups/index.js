App.Views.GroupsIndex = Backbone.View.extend({
  template: JST['groups/index'],

  initialize: function () {
    this.listenTo(this.collection, "add sync remove", this.render);
  },

  render: function () {
    var content = this.template({ groups: this.collection });
    this.$el.html(content);
    return this;
  }
  // events: { "click button.delete": "deleteBoard" },
  //
  // deleteBoard: function (e) {
  //   var $button = $(e.currentTarget);
  //   var $board = this.collection.get($button.attr("data-id"));
  //   $board.destroy();
  // },
})
