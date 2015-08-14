App.Views.GroupForm = Backbone.View.extend({

  template: JST['groups/form'],

  events: {
    'click button': 'submitForm',
    'click .faded-background': 'removeViewAndGoBack',
    'click .link': 'removeViewAndGoBack'
  },

  initialize: function () {
    $(document).on('keyup', this.handleKey.bind(this));
  },

  handleKey: function (event) {
    if (event.keyCode === 27) {
      this.remove();
      Backbone.history.history.back();
    }
  },

  removeViewAndGoBack: function () {
    this.remove();
    Backbone.history.history.back();
  },

  submitForm: function (e) {
    e.preventDefault();
    var attributes = this.$el.serializeJSON();
    this.model.set(attributes);
    this.model.save(attributes, {
      success: function () {
        this.collection.add(this.model, { merge: true });
        this.remove();
        Backbone.history.history.back();
      }.bind(this)
    });
  },

  render: function () {
    var content = this.template({ group: this.model });
    this.$el.html(content);
    this.onRender();
    return this;
  },

  onRender: function () {
    $('.focus-target').focus()
  },

})
