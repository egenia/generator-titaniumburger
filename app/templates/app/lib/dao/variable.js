var db = Alloy.Globals.Lib.get('db');

var w = {
	getAll: function(){

		var res = db.execute('SELECT key_ AS cle, value AS valeur, visible FROM variable');

		var all = {};

		while(res.isValidRow()){

			all[res.fieldByName('cle')] = {valeur : res.fieldByName('valeur')};

			res.next();
		}

		return all;
	},
	get: function(key){

		var res = db.execute('SELECT value AS valeur FROM variable WHERE key_ = ?', key);

		if(res.isValidRow()){

			return res.fieldByName('valeur');

		}

		return null;
	},
	getBool: function(key){

		var res = db.execute('SELECT value AS valeur FROM variable WHERE key_ = ?', key);

		if(res.isValidRow()){

			return res.fieldByName('valeur') == '1';

		}

		return null;
	},
	remove: function(key){

		var res = db.execute('DELETE FROM variable WHERE key_ = ?', key);

		return null;
	},
	set: function(cle, valeur){

		var res = db.execute('SELECT value AS valeur FROM variable WHERE key_ = ?', cle);

		if(res.isValidRow()){

			if(res.fieldByName('valeur') !== valeur){

				db.execute('UPDATE variable SET value = ? WHERE key_ = ?', valeur, cle);

			}

		}else{

			db.execute('INSERT INTO variable (key_, value) VALUES (?, ?) ', cle, valeur);

		}

	}
};

module.exports = w;
