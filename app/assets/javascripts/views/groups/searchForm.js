App.Views.SearchForm = Backbone.View.extend({

    template: JST['groups/searchForm'],

    events: {
      'click .faded-background': 'remove',
      'click p': 'remove'
    },

    initialize: function (options) {
      $(document).on('keyup', this.handleKey.bind(this));
      this.groups = options.collection;
      this.searchString = options.searchString;
      this.fetchAll();
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

    fetchAll: function () {
      this.allEvents = new App.Collections.Events()
      this.allEvents.fetch({
        success: function () {
          this.users = new App.Collections.Users();
          this.users.fetch({
            success: function () {
              this.searchResults();
            }.bind(this)
          })
        }.bind(this)
      })
    },

    searchResults: function () {
        debugger
    },

    render: function () {
      var content = this.template({ group: this.model });
      this.$el.html(content);
      return this;
    },

  })
