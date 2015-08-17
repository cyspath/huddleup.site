App.Views.CommentsIndexItem = Backbone.View.extend({
  template: JST['comments/indexItem'],
  className: "comment-item-container",

  initialize: function () {
    this.listenTo(this.model, "add sync remove", this.render);
  },

  render: function () {
    var content = this.template({ comment: this.model });
    this.$el.html(content);
    return this;
  }

})
