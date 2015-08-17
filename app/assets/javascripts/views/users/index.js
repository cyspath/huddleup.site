App.Views.MembersIndex = Backbone.CompositeView.extend({
  template: JST['users/index'],

  initialize: function () {

    this.listenTo(this.collection, "add", this.addMemberView);

    this.listenTo(this.collection, "remove", this.removeCommentView);

    this.listenTo(this.collection, "sync", this.render);

    this.collection.each(this.addMemberView.bind(this));
  },

  addMemberView: function (memberItem) {
    var subview = new App.Views.MembersIndexItem({ model: memberItem });
    this.addSubview('.users-container', subview);
  },

  removeCommentView: function (memberItem) {
    this.removeModelSubview('.users-container', memberItem)
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }

})
