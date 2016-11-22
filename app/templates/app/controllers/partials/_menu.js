// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
/*
ListView menu de gauche
*/

/**
 * @class Controller.common._menuRight
 * Create the right view of drawer
 */

 /**
  * @method Controller
  * Create the left menu with item in config.menuLeft
  * @param  {Object} args Arguments passed to the controller
  */
(function constructor(args){

 //var menu = Alloy.Globals.Lib.get('config').menuLeft;

 //load(menu, Ti.App.Properties.getBool('connected'));

})($.args);

/**
* Load items on the ListView
* @param  {Array} data ListItem
*/
function load(data){

 $.listview.setSections([]);

 var d = [];

 _.each(data, function(row){

   _.extend(row, {
     height : 58,
     backgroundColor : Alloy.CFG.COLORS.menuBg,
     selectionStyle : OS_IOS ? Titanium.UI.iPhone.ListViewCellSelectionStyle.NONE : ''
   });

   elem = {
     template : row.templatInactive,
     properties : row,
     title : {
       text : row.title
     }
   };

   d.push(elem);

 });

 $.listview.setSections([Ti.UI.createListSection({ items : d })]);

   //load first item of menu
   _.defer(function(){
       $.listview.fireEvent('itemclick', { sectionIndex : 0, itemIndex : 0 });
   });


}

$.load = load;

function handleClick(e){

 var prop = $.listview.getSections()[e.sectionIndex].getItemAt(e.itemIndex).properties;

 $.trigger('click', e);

}
