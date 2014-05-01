// SongQueueView.js - Defines a backbone view class for the song queue.
var SongQueueView = Backbone.View.extend({

  initialize: function() {
    this.entryViews = this.collection.map(function(song){
      return new SongQueueEntryView({model: song});
    });

    this.collection.on("add", this.addView, this);
    this.collection.on("remove", this.removeView, this);

    this.render();
  },

  addView: function(song, collection, options) {
    this.entryViews.splice(options.at, 0, new SongQueueEntryView({model: song}) );
    this.render();
  },

  removeView: function(song, collection, options) {
    this.entryViews.splice(options.index, 1);
    this.render();
  },

  render: function() {
    this.$el.children().detach();

    this.$el.html('<th>Queue</th>').append(
      _(this.entryViews).map(function(entryView){
        return entryView.render();
      })
    );
  }

});
