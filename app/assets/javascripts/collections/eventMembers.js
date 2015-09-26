

App.Collections.EventMembers = Backbone.Collection.extend({
  url: '/api/event_members',
  model: App.Models.EventMember,

  getOrFetch: function (id) {
    var collection = this;
    var model = collection.get(id);
    if (model) {
      model.fetch();
    } else {
      model = new App.Models.EventMember({ id: id });
      model.fetch({
        success: function(model, response) { collection.add(model) },
        error: function () { collection.remove(model); }
      });
    }
    return model;
  }

});
