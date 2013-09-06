Ext.define('phonegap.view.Viewport', {
  extend: 'Ext.Container',
  xtype: 'viewcontainer',

  requires: [
    'Ext.Toolbar'
  ],
  
  config: {
    fullscreen: true,
      layout: 'card',
      cardSwitchAnimation: 'slide'

  }
});
