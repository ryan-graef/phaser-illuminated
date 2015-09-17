var WIDTH = 640;
var HEIGHT = 640;
var game;


MainState = function(){

}

MainState.prototype = {
    _phaserIlluminated: null,

    preload: function(){
        
    },

    create: function(){
        game.world.setBounds(0, 0, 2000, 2000);

        //initialize the phaser-illuminated object and functions
        game.plugins.add(Phaser.Plugin.PhaserIlluminated);

        myBackgroundBmd = game.add.bitmapData(game.width, game.height);
        myBackgroundBmd.ctx.fillStyle = "#333333";
        myBackgroundBmd.ctx.fillRect(0, 0, game.width, game.height);
        game.cache.addBitmapData('background', myBackgroundBmd);
        myBackgroundSprite = game.add.sprite(0, 0, myBackgroundBmd);

        //add a lamp to the game
        myLamp1 = game.add.illuminated.lamp(0, 0);
        //myMask = game.add.illuminated.darkMask();

        myLamp2 = game.add.illuminated.lamp(0, 0);
        //myMask.bringToTop();
        //myMask.addLampSprite(myLamp2);

        myObj = game.add.illuminated.discObject(80, 80, 40);
        myObj2 = game.add.illuminated.rectangleObject(250, 160, 40, 40);
        myObj3 = game.add.illuminated.rectangleObject (80, 180, 40, 40);
        myObjs = [myObj, myObj2, myObj3];
        myLamp2.createLighting(myObjs);
        myLamp1.createLighting(myObjs);
    },

    update: function(){
        myLamp1.refresh();
        myLamp2.refresh();
        //myMask.refresh();
        myLamp1.y -= 0.5;
        myLamp2.y += 0.5;

        if(game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
            game.camera.x += 5;
        }else if(game.input.keyboard.isDown(Phaser.Keyboard.LEFT)){
            game.camera.x -= 5;
        }

        if(game.input.keyboard.isDown(Phaser.Keyboard.UP)){
            game.camera.y -= 5;
        }else if(game.input.keyboard.isDown(Phaser.Keyboard.DOWN)){
            game.camera.y += 5;
        }
    },

    render: function(){

    }
}

document.addEventListener("DOMContentLoaded", function(event){
    game = new Phaser.Game(WIDTH, HEIGHT, Phaser.AUTO, 'game', new MainState());
});