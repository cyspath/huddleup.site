

App.Collections.GroupMembers = Backbone.Collection.extend({
  url: '/api/group_members',
  model: App.Models.GroupMember,

  getOrFetch: function (id) {
    var collection = this;
    var model = collection.get(id);
    if (model) {
      model.fetch();
    } else {
      model = new App.Models.GroupMember({ id: id });
      model.fetch({
        success: function(model, response) { collection.add(model) },
        error: function () { collection.remove(model); }
      });
    }
    return model;
  }

});
