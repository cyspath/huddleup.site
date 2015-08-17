App.Views.EventsIndex = Backbone.CompositeView.extend({
  template: JST['events/index'],

  initialize: function () {

    this.listenTo(this.collection, "add", this.addEventView);

    this.listenTo(this.collection, "remove", this.removeEventView);

    this.listenTo(this.collection, "sync", this.render);

    this.collection.each(this.addEventView.bind(this));
  },

  addEventView: function (eventItem) {
    var subview = new App.Views.EventsIndexItem({ model: eventItem });
    this.addSubview('.events-container', subview);
  },

  removeEventView: function (eventItem) {
    this.removeModelSubview('.events-container', eventItem)
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }

})
