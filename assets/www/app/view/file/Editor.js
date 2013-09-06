Ext.define('phonegap.view.file.Editor', {
  extend: 'Ext.Panel',
  xtype: 'fileEditor',

  requires: [
      'phonegap.view.toolbars.TopBack',
      'phonegap.view.toolbars.BottomForm',
      'phonegap.view.contato.Form'
  ],

  config: {
    styleHtmlContent: true,
    fullscreen: true,
    scroll : true,
    layout : 'fit',

    items: [
     {
       xtype: 'topbackbar',
       docked: 'top',
       title: 'Cadastro'
     },
      {
        xtype: 'formFile',
        id: 'formFileId'
      },
    ],
  }
});
