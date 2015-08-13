App.Views.GroupForm = Backbone.View.extend({

  template: JST['groups/form'],

  events: { 'click button': 'submitForm' },

  tagName: 'form',

  className: 'group-form',

  submitForm: function (e) {
    e.preventDefault();
    // this.$('button').blur();
    var attributes = this.$el.serializeJSON();
    var that = this;
    this.model.set(attributes);
    this.model.save(attributes, {
      success: function () {
        that.collection.add(that.model, { merge: true });
        Backbone.history.navigate("", { trigger: true });
      }
    });
  },

  render: function () {
    var content = this.template({ group: this.model });
    this.$el.html(content);
    return this;
  }

})
