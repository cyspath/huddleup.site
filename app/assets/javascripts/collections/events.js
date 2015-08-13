App.Collections.Comments = Backbone.Collection.extend({
  url: '/api/events',
  model: App.Models.Event,

  getOrFetch: function (id) {
    var collection = this;
    var model = collection.get(id);
    if (model) {
      model.fetch();
    } else {
      model = new App.Models.Event({ id: id });
      model.fetch({
        error: function () { collection.remove(model); }
      });
    }
    return model;
  }

});
