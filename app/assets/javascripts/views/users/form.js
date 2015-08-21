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
      success: function () {
        this.collection.add(this.model, { merge: true });
        //animation
        $('.huddle-form').addClass("animated zoomOutLeft")
        $('.huddle-form').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', this.remove.bind(this));
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



    <select name="user[sex]">
      <option value="♀">Lady</option>
      <option value="♂">Gentleman</option>
    </select>

    <select name="user[age_preference]">
      <option value="♀">Lady</option>
      <option value="♂">Gentleman</option>
    </select>

    <select name="cars">
      <option value="volvo">Volvo XC90</option>
      <option value="saab">Saab 95</option>
      <option value="mercedes">Mercedes SLK</option>
      <option value="audi">Audi TT</option>
    </select>
