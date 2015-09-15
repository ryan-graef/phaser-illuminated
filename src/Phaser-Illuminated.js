PhaserIlluminated = function(game){
    this._game = game;
    this._construct();
}

PhaserIlluminated.prototype = {
    _game: null,
    _bmd: null,
    _sprite: null,
    _lamps: null,
    _darkMask: null,

    _construct: function(){
        this._bmd = this._game.add.bitmapData(this._game.width, this._game.height);
        game.cache.addBitmapData('lamp', this._bmd);
        this._sprite = this._game.add.sprite(0, 0, game.cache.getBitmapData('lamp'));
        this._lamps = [];
    },

    /* Uses standard illuminated.js Lamp config */
    addLamp: function(config){
        var temp = new illuminated.Lamp(config);
        this._lamps.push(temp);

        if(this._darkMask){
            this._darkMask.lights.push(temp);
        }

        return temp;
    },

    /* Uses standard illuminated.js DarkMask config */
    addDarkMask: function(color){
        this._darkMask = new illuminated.DarkMask({lights: this._lamps}, color ? color: 'rgba(0,0,0,0.5)');
    },

    update: function(){
        var bmd = game.cache.getBitmapData('lamp');

        if(this._darkMask){
            this._darkMask.compute(this._game.width, this._game.height);
        }

        //this._bmd.context.clearRect(0, 0, this._bmd.width, this._bmd.height);
        if(this._darkMask){
            this._darkMask.render(bmd.context);
        }else{
            this._lamps.forEach(function(lamp){
                lamp.render(bmd.context);
            }, this);
        }

        bmd.dirty = true;
    },

    render: function(){
        
    }
}

