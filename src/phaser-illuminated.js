PhaserIlluminated = function(game){
    this._game = game;
    this._construct();
}

PhaserIlluminated.prototype = {
    _game: null,

    _construct: function(){
        this._game.add.illuminated = {};
        this._game.add.illuminated.lamp = this._createLamp;
        this._game.add.illuminated.darkMask = this._createDarkMask;
        this._game.add.illuminated.lighting = this._createLighting;

        this._game.add.illuminated._illuminatedSprites = [];
    },

    _createLamp: function(x, y, config){
        var radius;
        if(!config || !config.radius){
            radius = 200;
        }else{
            radius = config.radius;
        }

        if(!x){
            x = 0;
        }

        if(!y){
            y = 0;
        }

        var bmd = game.add.bitmapData(radius*2, radius*2);
        game.cache.addBitmapData(this._illuminatedSprites.length, bmd);
        var lamp = new illuminated.Lamp({position: new illuminated.Vec2(radius, radius)});
        lamp.render(bmd.ctx);
        var sprite = game.add.sprite(x, y, bmd);
        sprite.bmdIndex = this._illuminatedSprites.length;
        sprite.bmd = bmd;
        sprite.lamp = lamp;
        sprite.refresh = function(){
            this.lamp.render(this.bmd.ctx);
            this.bmd.dirty = true;
        }


        this._illuminatedSprites.push(sprite);
        return sprite;
    },

    _createDarkMask: function(){

    },

    _createLighting: function(){

    }
}
