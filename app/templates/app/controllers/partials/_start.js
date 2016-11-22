// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

function openLogin(e){

  if(OS_IOS){
      Alloy.Globals.root.openWindow(Alloy.createController('login').getView());
  }else{
      Alloy.createController('login').getView().open();
  }

}

function openSignup(e){

  if(OS_IOS){
      Alloy.Globals.root.openWindow(Alloy.createController('signup').getView());
  }else{
      Alloy.createController('signup').getView().open();
  }

}

function openHome(e){

  Alloy.createController('home').getView();

}
