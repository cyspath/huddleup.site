App.Models.Group = Backbone.Model.extend({
  urlRoot: '/api/groups',

  parse: function(payload) {
    debugger
    if(payload.events) {
      this.events().set(payload.events);
      delete payload.events;
    }

    if(payload.users) {
      this.users().set(payload.users);
      delete payload.users;
    }

    if(payload.comments) {
      this.comments().set(payload.comments);
      delete payload.comments;
    }

    return payload;
  },

  events: function () {
    if(this._events === undefined) {
      this._events = new App.Collections.Events();
    }
    return this._events;
  },

  users: function () {
    if(this._users === undefined) {
      this._users = new App.Collections.Users();
    }
    return this._users;
  },

  comments: function () {
    if(this._comments === undefined) {
      this._comments = new App.Collections.Comments();
    }
    return this._comments;
  },
})
