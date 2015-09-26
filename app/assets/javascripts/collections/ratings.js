App.Collections.Ratings = Backbone.Collection.extend({
  url: '/api/ratings',
  model: App.Models.Rating,

  getOrFetch: function (id) {
    var collection = this;
    var rating = collection.get(id);
    if (rating) {
      rating.fetch();
    } else {
      rating = new App.Models.Rating({ id: id });
      rating.fetch({
        success: function(model, response) { collection.add(model) },
        error: function () { collection.remove(rating); }
      });
    }
    return comment;
  }

});
