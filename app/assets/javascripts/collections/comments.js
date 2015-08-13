App.Collections.Comments = Backbone.Collection.extend({
  url: '/api/comments',
  model: App.Models.Comment,

  getOrFetch: function (id) {
    var collection = this;
    var comment = collection.get(id);
    if (comment) {
      comment.fetch();
    } else {
      comment = new App.Models.Comment({ id: id });
      comment.fetch({
        error: function () { collection.remove(comment); }
      });
    }
    return comment;
  }

});
