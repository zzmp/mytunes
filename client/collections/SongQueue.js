// SongQueue.js - Defines a backbone model class for the song queue.
var SongQueue = Songs.extend({

  initialize: function(){
    this.on('add', this.queue, this);
    this.on('dequeue', this.dequeue, this);
    this.on('ended', this.advance, this);
    this.on('remove', this.playNext, this)
  },

  queue: function(song){
    if (this.length === 1) this.playFirst();
  },

  dequeue: function(song){
    this.remove(song);
  },

  advance: function(song){
    this.shift();
    if (this.length) this.playFirst();
  },

  playFirst: function() {
    this.at(0).play();
  },

  playNext: function(song, collection, options){
    (!options.index && this.length) ? this.playFirst() : ( this.length || this.stopPlayback() );
  },

  stopPlayback: function() {
    this.trigger('stop');
  }

});