var SongRouter = Backbone.Router.extend({

  initialize: function(model) {
    this.model = model;

    this.setURL( this.model, this.model.get('currentSong') );

    this.model.on('change:currentSong', this.setURL, this);
  },

  routes: {
    "songs/:title": function(title) {
      this.model.play(title);
    }
  },

  setURL: function(app, song) {
    song && song.get('title') ?
      this.navigate( "songs/" + song.get('title') ) :
      this.navigate("");
  }

})