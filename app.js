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
        game.plugins.add(Phaser.Plugin.PhaserIlluminated);

        myBackgroundBmd = game.add.bitmapData(game.width, game.height);
        myBackgroundBmd.ctx.fillStyle = "#000000";
        myBackgroundBmd.ctx.fillRect(0, 0, game.width, game.height);
        game.cache.addBitmapData('background', myBackgroundBmd);
        myBackgroundSprite = game.add.sprite(0, 0, myBackgroundBmd);

        //add a lamp to the game
        myLamp1 = game.add.illuminated.lamp(0, 0);
        //myMask = game.add.illuminated.darkMask();

        myLamp2 = game.add.illuminated.lamp(0, 0);
        //myMask.bringToTop();
        //myMask.addLampSprite(myLamp2);

        myObj = game.add.illuminated.rectangleObject(120, 120, 40, 30);
        myObjs = [myObj];
        myLamp2.createLighting(myObjs);
        myLamp1.createLighting(myObjs);
    },

    update: function(){
        myLamp1.refresh();
        myLamp2.refresh();
        //myMask.refresh();
        myLamp1.y -= 0.5;
        myLamp2.y += 0.5;
    },

    render: function(){

    }
}

document.addEventListener("DOMContentLoaded", function(event){
    game = new Phaser.Game(WIDTH, HEIGHT, Phaser.AUTO, 'game', new MainState());
});