Ext.define('phonegap.view.toolbars.BottomForm', {
  extend: 'phonegap.view.toolbars.Bottom',
  xtype: 'bottomform',
  
  config: {
    items: [
      {xtype: 'spacer'},
      {
        text: 'Excluir',
        ui: 'decline',
        id: 'buttonBarExcluirId'
      },
      {
        text: 'Salvar',
        ui: 'confirm',
        id: 'buttomBarSalvarId'
      }
    ]
  }  
});
