Ti.API.debug('DIRECTORY IS => '+Ti.Filesystem.applicationDataDirectory);

Alloy.Globals.moment = require('moment');
Alloy.Globals.moment.locale(Ti.Locale.currentLanguage);
Alloy.Globals.animation = require('alloy/animation');

Alloy.Globals.Lib = {
    libs: {},
    get: function(n){

        var lib = Alloy.Globals.Lib;

        if(!lib.isLoaded(n)){

            lib.load(n);

        }

        return lib.libs[n];

    },
    isLoaded: function(n){

        return n in Alloy.Globals.Lib.libs;

    },
    load: function(n){

        Alloy.Globals.Lib.libs[n] = require(n);

    }
};

Alloy.Globals.drawerWidth  = Math.round(OS_IOS ? (Ti.Platform.displayCaps.platformWidth*0.828) : Ti.Platform.displayCaps.xdpi);

//Alloy.Globals.Lib.get('install')();
//Alloy.Globals.Lib.get('core').Webservices.init();

Alloy.Globals.iOS7 = Alloy.Globals.Lib.get('core').Routines.isiOS7Plus();
Alloy.Globals.theTop = Alloy.Globals.iOS7 ? 20 : 0;

//https://marvelapp.com/7f9e0ig
