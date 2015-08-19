App.Collections.Images = Backbone.Collection.extend({
  url: 'api/images',
  model: App.Models.Image
});
