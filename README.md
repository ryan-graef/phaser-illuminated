# Phaser-Illuminated
A Javascript library for interfacing Phaser.js and Illuminated.js for light effects in web games.

This is how you use the library.

```
//defined global game object (the phaser game instance)
game;

create: function(){
    //initialize the library.  This adds the necessary functions to all Phaser classes.
    game.plugins.add(Phaser.Plugin.PhaserIlluminated);

    //illuminated objects are added via this addition to the game.add instance.
    //these functions return Phaser.Sprite objects that can be used as such
    //config object is the same as illuminated lamps take, to customize all parameters
    //you can use myLamp1.getLamp() to get the illuminated lamp object
    myLamp1 = game.add.illuminated.lamp(200, 200 /*,{ illuminated lamp config object }*/);

    //add an opaque object.  parameters are (x, y, width, height).
    //this is not a phaser.sprite object because it's not actually drawn,
    //except by the lamp.
    //It's an illuminated.polygonObject instance
    myObj = game.add.illuminated.rectangleObject(420, 210, 40, 30);

    //lighting is done on a per-lamp basis, so each lamp sprite has a lighting object under it
    //that you can create and add PolygonObjects to.
    myObjs = [myObj];
    myLamp2.createLighting(myObjs);

    //darkmask is a sprite but takes up the entire game screen, IE WxH.
    //it cookie-cutters out existing lamp implementations.
    //it needs a reference to all lamp sprites, but these can be added later
    myLamps = [myLamp];
    myMask = game.add.illuminated.darkMask(myLamps/*, color*/);
    //myMask.addLampSprite(myLamp2); <-- alternative to adding at construction time
}

update: function(){
    //all illuminated Sprite objects have this refresh function, which redraws them
    //this will need to be called each time a lamp moves, or changes a parameter
    //if the lamp is not changed, don't call this because it's pretty expensive.
    myLamp.refresh()
    myMask.refresh()
}

render: function(){

}
```


For additional information, check out app.js.  If you want to run it on your local machine, you'll need to get a copy of Phaser.js and illuminated.js from their respective repos.
