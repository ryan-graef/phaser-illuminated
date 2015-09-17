Phaser.Plugin.PhaserIlluminated = function(game){
    this._game = game;
    this._construct();
}


Phaser.Plugin.PhaserIlluminated.prototype = Object.create(Phaser.Plugin.prototype);
Phaser.Plugin.PhaserIlluminated.prototype.constructor = Phaser.Plugin.Webcam;
Phaser.Plugin.PhaserIlluminated.prototype._construct = function(){
    //these guys function as sprites
    this._game.add.illuminated = {};
    this._game.add.illuminated.lamp = this._createLamp;
    this._game.add.illuminated.darkMask = this._createDarkMask;

    //these guys function as their regular illuminated.js counterparts
    this._game.add.illuminated.rectangleObject = this._createRectangleObject;

    //this is a bit hacky but the add calls are from the scope of the illuminated object, so we put needed
    //variables here
    this._game.add.illuminated._illuminatedSprites = [];
    this._game.add.illuminated._opaqueObjects = [];
    this._game.add.illuminated._game = this._game;

    //override this to respect the sprite offset
    illuminated.Lamp.prototype.mask = function (ctx) {
        var c = this._getVisibleMaskCache();
        var orientationCenter = new illuminated.Vec2(Math.cos(this.angle), -Math.sin(this.angle)).mul(this.roughness*this.distance);
        ctx.drawImage(c.canvas, this.offset.x + Math.round(this.position.x+orientationCenter.x-c.w/2), this.offset.y + Math.round(this.position.y+orientationCenter.y-c.h/2));
    }
}

Phaser.Plugin.PhaserIlluminated.prototype._createLamp = function(x, y, config){
    //distance is the actual distance the light travels
    var distance;
    if(!config || !config.distance){
        distance = 200;
    }else{
        distance = config.distance;
    }

    if(!x){
        x = 0;
    }

    if(!y){
        y = 0;
    }

    var bmd = game.add.bitmapData(distance*2, distance*2);
    game.cache.addBitmapData('illuminated-lamp-'+this._illuminatedSprites.length, bmd);
    var lamp = new illuminated.Lamp({position: new illuminated.Vec2(distance, distance), distance: distance});
    lamp.offset = {};
    var sprite = game.add.sprite(x, y, bmd);
    sprite.bmdIndex = 'illuminated-lamp-'+this._illuminatedSprites.length;
    sprite.bmd = bmd;
    sprite.lamp = lamp;

    //update the bmd and update the position of the lamp for masking and lighting purposes
    sprite.refresh = function(){
        this.bmd.ctx.clearRect(0, 0, this.bmd.width, this.bmd.height);

        if(this.lighting){
            //render solid objects relative to position of sprites
            this.lighting.objects.forEach(function(o){
                o.topleft.x = o.originalX - this.x;
                o.topleft.y = o.originalY - this.y;
                o.bottomright.x = o.originalX + o.originalW - this.x;
                o.bottomright.y = o.originalY + o.originalH - this.y
                o.syncFromTopleftBottomright();
            }, this);

            this.lighting.compute(this.bmd.width, this.bmd.height);
            this.lighting.render(this.bmd.ctx);
        }else{
            this.lamp.render(this.bmd.ctx);
        }

        this.bmd.dirty = true;
        this.lamp.offset.x = this.x;
        this.lamp.offset.y = this.y;
    }
    sprite.createLighting =  function(opaqueObjects){
        if(!opaqueObjects){
            return null;
        }

        var bmd = this.bmd;

        var lighting = new illuminated.Lighting({light: lamp, objects: opaqueObjects});
        lighting.compute(bmd.width, bmd.height);
        lighting.render(bmd.ctx);

        this.lighting = lighting;

        return this;
    }
    sprite.getLamp = function(){
        return this.lamp;
    }

    sprite.refresh();

    this._illuminatedSprites.push(sprite);
    return sprite;
}

Phaser.Plugin.PhaserIlluminated.prototype._createDarkMask = function(illuminatedSprites, color){
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
    var darkMask = new illuminated.DarkMask({lights: lamps, color: color ? color : 'rgba(0,0,0,0.8'});
    darkMask.compute(this._game.width, this._game.height);
    darkMask.render(bmd.ctx);
    var sprite = game.add.sprite(0, 0, bmd);
    sprite.darkMask = darkMask;
    sprite.bmdIndex = 'illuminated-darkmask';
    sprite.bmd = bmd;
    sprite.refresh = function(){
        this.bmd.ctx.clearRect(0, 0, this.bmd.width, this.bmd.height);
        this.darkMask.compute(this.bmd.width, this.bmd.height);
        this.darkMask.render(bmd.ctx);
        this.bmd.dirty = true;
    }
    sprite.getMask = function(){
        return this.darkMask;
    }
    sprite.addLampSprite = function(lampSprite){
        this.darkMask.lights.push(lampSprite.lamp);
        this.refresh();
    }


    return sprite;
}

Phaser.Plugin.PhaserIlluminated.prototype._createRectangleObject = function(x, y, w, h){
    var obj = new illuminated.RectangleObject({topleft: new illuminated.Vec2(x, y),bottomright: new illuminated.Vec2(x+w, y+h)});
    obj.originalX = x;
    obj.originalY = y;
    obj.originalW = w;
    obj.originalH = h;

    return obj;
}
