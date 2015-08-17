App.Models.User = Backbone.Model.extend({
  urlRoot: '/api/users',

  parse: function(payload) {

    if(payload.upcoming_events) {
      this.upcomingEvents().set(payload.upcoming_events);
      delete payload.upcoming_events;
    }

    if(payload.past_events) {
      this.pastEvents().set(payload.past_events);
      delete payload.past_events;
    }

    if(payload.groups) {
      this.groups().set(payload.groups);
      delete payload.groups;
    }

    if(payload.comments) {
      this.comments().set(payload.comments);
      delete payload.comments;
    }

    return payload;
  },

  upcomingEvents: function () {
    if(this._upcomingEvents === undefined) {
      this._upcomingEvents = new App.Collections.Events();
    }
    return this._upcomingEvents;
  },

  pastEvents: function () {
    if(this._pastEvents === undefined) {
      this._pastEvents = new App.Collections.Events();
    }
    return this._pastEvents;
  },

  groups: function () {
    if(this._groups === undefined) {
      this._groups = new App.Collections.Groups();
    }
    return this._groups;
  },

  comments: function () {
    if(this._comments === undefined) {
      this._comments = new App.Collections.Comments();
    }
    return this._comments;
  },

})
