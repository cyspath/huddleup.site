App.Views.GroupForm = Backbone.View.extend({

  template: JST['groups/form'],

  events: {
    'submit form': 'submitForm',
    'click .faded-background': 'removeViewAndGoBack',
    'click .link': 'removeViewAndGoBack',
    'click p': 'removeViewAndGoBack'
  },

  initialize: function () {
    $(document).on('keyup', this.handleKey.bind(this));
  },

  handleKey: function (event) {
    if (event.keyCode === 27) {
      this.removeViewAndGoBack();
    }
  },

  removeViewAndGoBack: function () {
    this.remove();
    Backbone.history.history.back();
  },

  submitForm: function (e) {
    e.preventDefault();
    var attributes = $(e.currentTarget).serializeJSON();
    this.model.set(attributes);
    this.model.save(attributes, {
      success: function () {
        this.collection.add(this.model, { merge: true });
        //animation
        $('.general-form').addClass("animated bounceOut")
        $('.general-form').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', this.callback.bind(this));
      }.bind(this)
    });
  },

  callback: function () {
    this.remove();
    Backbone.history.navigate("groups/"+ this.model.id, { trigger: true })
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
