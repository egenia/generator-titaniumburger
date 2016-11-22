(function constructor(){

  Alloy.createController(Ti.App.Properties.getBool('isConnected') ? 'home' : 'start').getView();

})();
