var db = Alloy.Globals.Lib.get('db');

var install = function(){

    var version = Ti.App.Properties.getInt('versionDb'),
        versionOrigine = version;

    if(!version){
        version = 0;
    }

    if(version < 1){

        Ti.App.Properties.setBool('isConnected', false);
        db.execute('CREATE TABLE IF NOT EXISTS variable (id INTEGER PRIMARY KEY AUTOINCREMENT, key_ VARCHAR(255) NOT NULL, value TEXT NULL)');

        version = 1;

    }

    if(version > versionOrigine){
        Ti.App.Properties.setInt('versionDb', version);
    }

};

module.exports = install;
