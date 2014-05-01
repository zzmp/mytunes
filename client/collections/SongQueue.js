// SongQueue.js - Defines a backbone model class for the song queue.
var SongQueue = Songs.extend({

  initialize: function(){
    this.on('add', this.queue, this);
    this.on('ended', this.advance, this);
    this.on('dequeue', this.remove, this);
  },

  queue: function(song){
    if (this.length === 1) this.playFirst();
  },

  advance: function(song){
    this.shift();
    if (this.length) this.playFirst();
  },

  playFirst: function() {
    this.at(0).play();
  }

});