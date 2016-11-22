
var menu = [
  {
    id : 'home',
    controller : 'partials/_home',
    image : 'menu_home.png',
    title : L('home'),
    titleWindow : L('home'),
    templateActive : 'activeTemplateWithIcon',
    templateInactive : 'inactiveTemplateWithIcon',
    requireLogin : false
  },
  {
    id : 'account',
    controller : 'account/profil',
    image : 'menu_account.png',
    title : L('account'),
    titleWindow : L('account'),
    templateActive : 'activeTemplateWithIcon',
    templateInactive : 'inactiveTemplateWithIcon',
    requireLogin : true
  }
];

var dispatcher = require('dispatcher');

(function constructor(args){

  $.drawer.open();
  $.menu.load(menu, true, true);

})($.args);

/**
 * @type {Number} currentIndex of menu item
 */
var currentIndex = null;

/**
 * @type {Object} rowMenu the row menu active
 */
var rowMenu = null;

/**
 * Open left/right drawer
 * @param  {Object} e window(iOS)/view(Android) property
 */
function toggle(e) {

    var fn = 'toggle' + e.source.type + 'Window';
    $.drawer[fn]();

}

/**
 * @event windowDidOpen
 * Fired when open the drawer
 * @param {Object} e drawer object property
 */
$.drawer.addEventListener('windowDidOpen', function(e) {

});

function handleClose(e){

}

$.drawer.addEventListener('drawerclose', function(e) {
  handleClose(e);
});
/**
 * @event windowDidClose
 * Fired when close the drawer
 * @param {Object} e drawer object property
 */
$.drawer.addEventListener('windowDidClose', function(e) {
  handleClose(e);
});

/**
 * Load view on centerWindow of the drawer
 * @param  {Object} e Object menu item
 */
function loadView(e){
  
  if(OS_IOS){
    if(currentWin){
      $.nav.closeWindow(currentWin);
      currentWin = null;
    }
  }

  if(e.connected){

    e = {
      itemIndex : rowMenu.properties.itemIndex,
      sectionIndex : rowMenu.properties.sectionIndex
    };
    currentIndex = null;

  }

  if(e.logout){

    e = {
      itemIndex : 0,
      sectionIndex : 0
    };
    currentIndex = null;
    $.drawer.fireEvent('windowDidClose', { force : true });

  }

  var index = e.itemIndex,
      id = e.id || null,
      titleWindow = e.titleWindow || '',
      sectionIndex = e.sectionIndex,
      data = e.data || {},
      dontOpen = e.dontOpen || false,
      section = $.menu.listview.getSections()[sectionIndex],
      //get the menu item row properties
      currentRow = section.getItems()[index] || {};

  //if we click on the active menu item
  if(currentIndex === index){

    if($.drawer.isLeftWindowOpen())
        $.drawer.toggleLeftWindow();

  }else{

    //unselect active menu item
    if(rowMenu){

      var properties = rowMenu.properties;
      rowMenu.template = properties.templateInactive;

      section.updateItemAt(properties.itemIndex, rowMenu);
      rowMenu = null;

    }

    if(index > -1){

      var currentProperties = currentRow.properties;
      currentProperties.itemIndex = index;
      currentProperties.sectionIndex = sectionIndex;
      currentRow.template = currentProperties.templateActive;

      section.updateItemAt(index, currentRow);

      //save the menu item index and row
      currentIndex = index;
      rowMenu = currentRow;
      var controllerName = currentProperties.controller;
      //force menu close
      if(!dontOpen){
        if($.drawer.isLeftWindowOpen())
            $.drawer.toggleLeftWindow();
      }

      //cleanup centerWindow
      $.contentWrapper.removeAllChildren();

      $.titleWindow.text = currentProperties.titleWindow;

    //add view to centerWindow
    _.defer(function(){
        $.contentWrapper.add(Alloy.createController(controllerName, _.extend(data, rowMenu)).getView());
    });

    }else{

      if($.drawer.isLeftWindowOpen())
          $.drawer.toggleLeftWindow();
      if($.drawer.isRightWindowOpen())
          $.drawer.toggleRightWindow();

      //cleanup centerWindow
      $.contentWrapper.removeAllChildren();

      $.titleWindow.text = titleWindow;
      currentIndex = -1;
      //add view to centerWindow
      _.defer(function(){
          $.contentWrapper.add(Alloy.createController(id, data).getView());
      });

    }

  }

}

function findRowMenu(o){

  var id = o.id || 'abcdefgh',
      data = o.data || {};

  var i = 0;
  _.find($.menu.listview.getSections()[0].getItems(), function(row){

    if(row.properties.id == id){
      row.properties.itemIndex = i;
      row.properties.sectionIndex = 0;
      $.menu.listview.fireEvent('itemclick', _.extend(row.properties, { data : data }));
      return true;
    }
    i++;

  });

}

dispatcher.on('findRowMenu', findRowMenu);

/*
var dispatcher = require('dispatcher');

  dispatcher.trigger('findRowMenu', {
    id : 'partner/list',
    data : {}
  });
*/

var currentWin = null;
function handleModelWin(o){

  _.defaults(o, {
    data : {},
    controller : null,
    dispatcher  : null
  });

  var win = Alloy.createController(o.controller, o.data);
  currentWin = win.getView();

  function close(){

    if(OS_IOS){
      if(currentWin){
          $.nav.closeWindow(currentWin);
          currentWin = null;
      }
    }else{
      currentWin.close();
    }

    win.off('close');
    win = null;
  }

  win.on('close', close);
  win.on('select' , function(e){

    if(o.dispatcher){
      dispatcher.trigger(o.dispatcher, e);
    }

    close();

  });

  if(OS_IOS){

    $.nav.openWindow(currentWin,  {animated : true});

  }else{

    currentWin.open();

  }

}

dispatcher.on('openWindow', handleModelWin);

/*
var dispatcher = require('dispatcher');

  dispatcher.trigger('openWindow', {
    controller : 'account/detail',
    data : e
  });
*/

/**
 * @event Shake
 * Fired when the phone is shake, do logout
 * @param {Object} e object shake property
 */
Ti.Gesture.addEventListener('shake', function(e){

});
