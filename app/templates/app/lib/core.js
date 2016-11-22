var routines = {
    valideEmail: function(valeur){

        return /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(valeur);
    },
    valideTelephone: function(valeur){

        return /^(((\+|00)\d{2,3})|0)[1-9]\d{8}$/.test(valeur);
    },
    removeItemFromArray: function(array, from, to) {

        var rest = array.slice((to || from) + 1 || array.length);

        array.length = from < 0 ? array.length + from : from;

        return array.push.apply(array, rest);
    },
    removeAccents: function(s){

        var r=s.toLowerCase();
        r = r.replace(new RegExp(/\s/g),"");
        r = r.replace(new RegExp(/[àáâãäå]/g),"a");
        r = r.replace(new RegExp(/æ/g),"ae");
        r = r.replace(new RegExp(/ç/g),"c");
        r = r.replace(new RegExp(/[èéêë]/g),"e");
        r = r.replace(new RegExp(/[ìíîï]/g),"i");
        r = r.replace(new RegExp(/ñ/g),"n");
        r = r.replace(new RegExp(/[òóôõö]/g),"o");
        r = r.replace(new RegExp(/œ/g),"oe");
        r = r.replace(new RegExp(/[ùúûü]/g),"u");
        r = r.replace(new RegExp(/[ýÿ]/g),"y");
        r = r.replace(new RegExp(/\W/g),"");

        return r;
    },
    turnPercentToDp: function(percent){

        var dp = 0;

        if(percent){

            if(OS_IOS){

                if(percent > 1){
                    percent = parseFloat(percent)/100;
                }
                dp = Math.ceil(Ti.Platform.displayCaps.platformWidth*percent);

            }else{

                dp = Math.round(percent)+'%';

            }

        }

        return dp;

    },
    listenNetwork : function(){

		    Alloy.Globals.online = Ti.Network.online;

		    var handleNetwork = function(e){
            Alloy.Globals.online = e.online;
            Ti.App.fireEvent('networkChange');
        };

        Ti.Network.addEventListener('change', handleNetwork);

		},
    humanReadableTable : function(date){

      var since = Alloy.Globals.moment(date),
        now = Alloy.Globals.moment(),
        diff = now.diff(since, 'hours');

      //moins de 24h
      if(diff < 24){
        return since.fromNow(true);
      //entre 24h et 48h
      }else if(diff >= 24 && diff < 48){
        return since.fromNow(true);
      //fulldate
      }else{
        return since.format('DD/MM/YYYY');
      }

    },
    isiOS7Plus : function(){
        // iOS-specific test
        if (OS_IOS)
        {
            var version = Titanium.Platform.version.split(".");
            var major = parseInt(version[0],10);

            // Can only test this support on a 3.2+ device
            if (major >= 7)
            {
                return true;
            }
        }
        return false;
    }
};

exports.Routines = routines;

var webservices = {
    baseurl : Alloy.CFG.baseurl,
    init : function(){
        //doc https://github.com/jasonkneen/RESTe
        var reste = Alloy.Globals.Lib.get('reste');

        var api = new reste();

        api.config({
            debug : true,
            autoValidateParams : false,
            timeout : -1,
            url : webservices.baseurl,
            //requestHeaders : {},
            requestHeaders: {
                "Content-Type": "application/json"
            },
            methods : [
                {
                    name : '',
                    get : ''
                }
            ],
            onError : function(e){
                Alloy.Globals.loading.hide();
            },
            onLoad : function(e, callback){
                callback(e);
            }
        });

        Alloy.Globals.api = api;

    }

};

exports.Webservices = webservices;

var db = Alloy.Globals.Lib.get('db');
var database = {
    getAll : function(table, where){

        var w = where || '';
        var res = db.execute('SELECT * FROM '+ table+' '+w);

        var nb  = res.getFieldCount();
        var all = [], d = null, name = null;

        while(res.isValidRow()){

            d = {};

            for(var j = 0; j < nb; ++j){

                name = res.fieldName(j);

                d[name] = res.fieldByName(name);

            }

            all.push(d);

            res.next();
        }

        return all;

    }

};

exports.Database = database;
