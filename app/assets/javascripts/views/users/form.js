App.Views.UserForm = Backbone.View.extend({

  template: JST['users/form'],

  events: {
    'click .button-update': 'submitForm',
    'click .faded-background': 'remove',
    'click .link': 'remove',
    'click p': 'remove'
  },

  initialize: function (options) {
    $(document).on('keyup', this.handleKey.bind(this));
  },

  handleKey: function (event) {
    if (event.keyCode === 27) {
      this.remove();
    }
  },

  submitForm: function (e) {
    e.preventDefault();
    var attributes = $('.general-form').serializeJSON();
    this.model.save(attributes, {
      success: function () {
        //animation
        $('.general-form').addClass("animated bounceOut")
        $('.general-form').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', this.remove.bind(this));
      }.bind(this),
      error: function (error,a,b) {
        debugger
      }
    });
  },

  render: function () {
    var content = this.template({ user: this.model });
    this.$el.html(content);
    this.onRender();
    return this;
  },

  onRender: function () {
    $('.focus-target').focus()
  },

})
