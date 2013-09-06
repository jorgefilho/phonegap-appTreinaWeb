Ext.define('phonegap.view.toolbars.TopBack', {
  extend: 'phonegap.view.toolbars.Top',
  xtype: 'topbackbar',
  
  config: {
    items: [
      {
        text: 'Voltar',
        ui: 'back',
        id: 'btnVoltar'
        
      }
    ]
  },
});
