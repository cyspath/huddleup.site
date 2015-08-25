App.Views.SearchForm = Backbone.View.extend({

    template: JST['groups/searchForm'],

    events: {
      'click .faded-background': 'remove',
      'click p': 'remove'
    },

    initialize: function (options) {
      $(document).on('keyup', this.handleKey.bind(this));

      this.groups = options.groups;
      this.allEvents = options.allEvents;
      this.users = options.users;
      this.searchString = options.searchString;

      this.searchResults();
    },

    handleKey: function (event) {
      if (event.keyCode === 27) {
        this.remove();
      }
    },

    searchResults: function () {
      this.constructRegex();
      this.matchedGroups = this.matchGroupResults();
      this.matchedEvents = this.matchHuddleResults();
      this.matchedUsers = this.matchUserResults();
    },

    constructRegex: function () {
      this.regex = new RegExp(this.searchString, 'i')
      return this.regex
    },

    matchGroupResults: function() {
      var list = [];
      this.groups.models.forEach(function(model){
        var attributes = model.attributes
        if (attributes.name.match(this.regex) != null) {
          model.set({ sentence: "" });
          list.push(model);
        } else if (attributes.body && attributes.body.match(this.regex) != null) {
          var index = attributes.body.match(this.regex).index;
          var bodySubstring = "Description: ..." + attributes.body.substring(index -30, index +35) + "...";
          model.set({ sentence: bodySubstring });
          list.push(model);
        }
      }.bind(this))
      return list;
    },

    matchHuddleResults: function() {
      var list = [];
      this.allEvents.models.forEach(function(model){
        var attributes = model.attributes
        if (attributes.title.match(this.regex) != null) {
          model.set({ sentence: "" });
          list.push(model);
        } else if (attributes.location && attributes.location.match(this.regex) != null) {
          var index = attributes.location.match(this.regex).index;
          var bodySubstring = "Huddle location:" + attributes.location.substring(index -30, index +35) + "...";
          model.set({ sentence: bodySubstring });
          list.push(model);
        } else if (attributes.body && attributes.body.match(this.regex) != null) {
          var index = attributes.body.match(this.regex).index;
          var bodySubstring = "Details: ..." + attributes.body.substring(index -30, index +35) + "...";
          model.set({ sentence: bodySubstring });
          list.push(model);
        }
      }.bind(this))
      return list;
    },

    matchUserResults: function() {
      var list = [];
      this.users.models.forEach(function(model){
        var attributes = model.attributes
        if (attributes.username.match(this.regex) != null) {
          model.set({ sentence: "" });
          list.push(model);
        } else if (attributes.residence && attributes.residence.match(this.regex) != null) {
          var index = attributes.residence.match(this.regex).index;
          var bodySubstring = "Lives in:" + attributes.residence.substring(index -30, index +35) + "...";
          model.set({ sentence: bodySubstring });
          list.push(model);
        } else if (attributes.bio && attributes.bio.match(this.regex) != null) {
          var index = attributes.bio.match(this.regex).index;
          var bodySubstring = "About me: ..." + attributes.bio.substring(index -30, index +35) + "...";
          model.set({ sentence: bodySubstring });
          list.push(model);
        }
      }.bind(this))
      return list;
    },

    render: function () {
      var content = this.template({
        groups: this.matchedGroups,
        huddles: this.matchedEvents,
        users: this.matchedUsers
       });
      this.$el.html(content);
      return this;
    },

  })
