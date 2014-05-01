// SongQueue.js - Defines a backbone collection class for the song queue.
var SongQueue = Songs.extend({

  initialize: function(){
    this.on('add', function(song, collection, options) {
      if (options.at === 0) this.playFirst();
      this.save();
    }, this);

    this.on('remove', function(song, collection, options) {
      this.playNext(options.index);
      this.save();
    }, this)
    
    this.on('dequeue', function(song) {
      this.remove(song);
    }, this);

    this.on('ended', this.advance, this);
  },

  advance: function(song){
    this.shift();
    if (this.length) this.playFirst();
  },

  playFirst: function() {
    this.at(0).play();
  },

  playNext: function(index){
    (!index && this.length) ? this.playFirst() : ( this.length || this.stopPlayback() );
  },

  stopPlayback: function() {
    this.trigger('stop');
  },

  save: function() {
    // only save the smallest unique identifier: URL
    window.localStorage._queue = JSON.stringify(this.pluck('url'));
  }

});