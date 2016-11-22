/*
Ecran de démarrage
*/
(function constructor(args){

  Alloy.Globals.root = $.nav;

  if(OS_IOS){
    Alloy.Globals.root.open();
  }else{
    $.start.win.open();
  }

})(arguments[0] || {});
