Ext.define('phonegap.view.toolbars.Top', {
  extend: 'Ext.Toolbar',
  xtype: 'topbar',
  
  config: {
    dock: 'top',
    title: 'Barra do topo',
    
    defautls:{
      iconMask : true,
      ui : 'plain'
    }
  },
  
  initialize: function(){
    this.callParent(arguments);
  },
  
});
