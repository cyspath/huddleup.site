App.Collections.Groups = Backbone.Collection.extend({
  url: '/api/groups',
  model: App.Models.Group,

  getOrFetch: function (id) {
    var collection = this;
    var group = collection.get(id);
    if (group) {
      group.fetch();
    } else {
      group = new App.Models.Group({ id: id });
      group.fetch({
        success: function(model, response) { collection.add(model) },
        error: function () { collection.remove(group); }
      });
    }
    return group;
  }

});
