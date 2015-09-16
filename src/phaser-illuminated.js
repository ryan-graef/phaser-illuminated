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

        //this is a bit hacky but the add calls are from the scope of the illuminated object, so we create an array to keep
        //track of cached bitmapdata objects here
        this._game.add.illuminated._illuminatedSprites = [];
        this._game.add.illuminated._game = this._game;
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
        game.cache.addBitmapData('illuminated-lamp-'+this._illuminatedSprites.length, bmd);
        var lamp = new illuminated.Lamp({position: new illuminated.Vec2(radius, radius)});
        lamp.render(bmd.ctx);
        var sprite = game.add.sprite(x, y, bmd);
        sprite.bmdIndex = 'illuminated-lamp-'+this._illuminatedSprites.length;
        sprite.bmd = bmd;
        sprite.lamp = lamp;
        sprite.refresh = function(){
            this.lamp.render(this.bmd.ctx);
            this.bmd.dirty = true;
        }
        sprite.getLamp = function(){
            return this.lamp;
        }


        this._illuminatedSprites.push(sprite);
        return sprite;
    },

    _createDarkMask: function(illuminatedSprites, color){
        //if we aren't provided with some sprites, we grab all by default
        if(!illuminatedSprites){
            illuminatedSprites = this._game.add.illuminated._illuminatedSprites;
        }

        var lamps = [];
        illuminatedSprites.forEach(function(e){
            lamps.push(e.lamp);
        }, this);

        var bmd = game.add.bitmapData(this._game.width, this._game.height);
        game.cache.addBitmapData('illuminated-darkmask', bmd);
        var darkMask = new illuminated.DarkMask({lights: lamps, color: color ? color : 'rgba(255,255,255,0.8'});
        darkMask.compute(this._game.width, this._game.height);
        darkMask.render(bmd.ctx);
        var sprite = game.add.sprite(0, 0, bmd);
        sprite.darkMask = darkMask;
        sprite.bmdIndex = 'illuminated-darkmask';
        sprite.bmd = bmd;
        sprite.refresh = function(){
            this.darkMask.compute(this._game.width, this._game.height);
            this.darkMask.render(bmd.ctx);
            this.bmd.dirty = true;
        }
        sprite.getMask = function(){
            return this.darkMask;
        }


        return sprite;
    },

    _createLighting: function(){

    }
}
