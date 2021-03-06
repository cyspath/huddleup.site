App.Models.Event = Backbone.Model.extend({
  urlRoot: '/api/events',

  parse: function(payload) {

    if(payload.images) {
      this.images().set(payload.images);
      delete payload.images;
    }

    if(payload.group) {
      this.group().set(payload.group);
      delete payload.group;
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

  group: function () {
    if(this._group === undefined) {
      this._group = new App.Collections.Groups();
    }
    return this._group;
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
