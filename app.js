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
        this._phaserIlluminated = new PhaserIlluminated(game);
        this._phaserIlluminated.addLamp({position: new illuminated.Vec2(12, 34)});
        //this._phaserIlluminated.addDarkMask();
        this._phaserIlluminated.addLamp({position: new illuminated.Vec2(120, 350)});
    },

    update: function(){
        this._phaserIlluminated.update();
    },

    render: function(){
        this._phaserIlluminated.render();
    }
}

document.addEventListener("DOMContentLoaded", function(event){
    game = new Phaser.Game(WIDTH, HEIGHT, Phaser.AUTO, 'game', new MainState());
});