App.Models.Group = Backbone.Model.extend({
  urlRoot: '/api/groups',

  parse: function(payload) {

    if(payload.images) {
      this.images().set(payload.images);
      delete payload.images;
    }

    if(payload.events) {
      this.events().set(payload.events);
      delete payload.events;
    }

    if(payload.upcoming_events) {
      this.upcomingEvents().set(payload.upcoming_events);
      delete payload.upcoming_events;
    }

    if(payload.past_events) {
      this.pastEvents().set(payload.past_events);
      delete payload.past_events;
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

  images: function () {
    if(this._selfImages === undefined) {
      this._selfImages = new App.Collections.Images();
    }
    return this._selfImages;
  },

  events: function () {
    if(this._groupEvents === undefined) {
      this._groupEvents = new App.Collections.Events();
    }
    return this._groupEvents;
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
