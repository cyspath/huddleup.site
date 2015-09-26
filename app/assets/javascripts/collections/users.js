App.Collections.Users = Backbone.Collection.extend({
  url: '/api/users',
  model: App.Models.User,

  getOrFetch: function (id) {
    var collection = this;
    var user = collection.get(id);
    if (user) {
      user.fetch();
    } else {
      user = new App.Models.User({ id: id });
      user.fetch({
        success: function(model, response) { collection.add(model) },
        error: function () { collection.remove(user); }
      });
    }
    return user;
  }

});
