App.Views.EventsIndexItem = Backbone.View.extend({
  template: JST['events/indexItem'],
  className: "event-item-container",

  initialize: function () {
    this.listenTo(this.model, "add sync remove", this.render);
  },

  render: function () {
    var content = this.template({ groupEvent: this.model });
    this.$el.html(content);
    return this;
  }

})
