App.Views.CommentsIndex = Backbone.CompositeView.extend({
  template: JST['comments/index'],

  initialize: function () {

    this.listenTo(this.collection, "add", this.addCommentView);

    this.listenTo(this.collection, "remove", this.removeCommentView);

    this.listenTo(this.collection, "sync", this.render);

    this.collection.each(this.addCommentView.bind(this));
  },

  addCommentView: function (commentItem) {
    var subview = new App.Views.CommentsIndexItem({ model: commentItem });
    this.addSubview('.comments-container', subview);
  },

  removeCommentView: function (commentItem) {
    this.removeModelSubview('.comments-container', commentItem)
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    if (this.collection.length === 0) {
      this.$el.append($("<div></div>").html("Start a conversation here!").addClass("start-convo-div"))
    }
    this.attachSubviews();
    
    return this;
  }

})
