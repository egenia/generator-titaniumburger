/**
 * @class Lib.xpui
 * Hook some Ti.UI components
 */

/**
 * Turn Window into View (for drawer navigation)
 * @param  {Object} args parameters of the window/view
 * @return {Object}      return Window for iOS and View for Android
 */
exports.createWindow = function(args) {

  return Ti.UI[OS_IOS ? 'createWindow' : 'createView'](args);

};

/**
 * Turn Button into View (for Android)
 * @param  {Object} args parameters of the button/view
 * @return {Object}      return Button for iOS and View for Android
 */
exports.createButton = function(args) {
    return Ti.UI[OS_IOS ? 'createButton' : 'createView'](args);
};
