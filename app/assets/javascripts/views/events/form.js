App.Views.HuddleForm = Backbone.View.extend({

  template: JST['events/form'],

  events: {
    'submit form': 'submitForm',
    'click .faded-background': 'remove',
    'click .link': 'remove',
    'click p': 'remove'
  },

  initialize: function (options) {
    this.group_id = options.group_id;

    $(document).on('keyup', this.handleKey.bind(this));
  },

  handleKey: function (event) {
    if (event.keyCode === 27) {
      this.remove();
    }
  },

  submitForm: function (e) {
    e.preventDefault();
    var attributes = $(e.currentTarget).serializeJSON();
    this.model.set(attributes);
    this.model.save(attributes, {
      success: function (a,b) {
        this.collection.add(this.model, { merge: true });

        var eventMember = new App.Models.EventMember();
        eventMember.save({ user_id: b.author_id, event_id: b.id }, {
          success: function () {
            //animation
            $('.general-form').addClass("animated zoomOutLeft")
            $('.general-form').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', this.remove.bind(this));
          }.bind(this)
        })
      }.bind(this)
    });
  },

  render: function () {
    var content = this.template({ huddle: this.model, group_id: this.group_id });
    this.$el.html(content);
    this.onRender();
    return this;
  },

  onRender: function () {
    $('.focus-target').focus()
  },

})
