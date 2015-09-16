var WIDTH = 960;
var HEIGHT = 640;
var game;


MainState = function(){

}

MainState.prototype = {
    _phaserIlluminated: null,

    preload: function(){
        
    },

    create: function(){
        //initialize the phaser-illuminated object and functions
        this._phaserIlluminated = new PhaserIlluminated(game);
        game.add.illuminated.lamp(250, 250);
    },

    update: function(){
        
    },

    render: function(){
        
    }
}

document.addEventListener("DOMContentLoaded", function(event){
    game = new Phaser.Game(WIDTH, HEIGHT, Phaser.AUTO, 'game', new MainState());
});