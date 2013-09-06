Ext.define('phonegap.view.info.Panel', {
  extend: 'Ext.Panel',
  xtype: 'infoPanel',

  requires: [
      'phonegap.view.toolbars.TopBack',
  ],

  config: {
    styleHtmlContent: true,
    html: '<h2>Media</h2>',

    layout: 'fit',

    initComponent: function(){
        this.dockedItems = this.buildDockItems();
        AppTreinaweb.views.info.Panel.superclass.initComponent.apply(this, arguments);
     },

     items: [
     {

       items: [
         {
          xtype: 'topbackbar',
          docked: 'top',
          title: 'Contato'
         },

         new Ext.Button({
                    text: 'Capturar vídeo',
                    id: 'panelButtonStartVideo'
            }),

         new Ext.Video({
                    width :98,
                    height :44,
                    id: 'panelShowVideo'
         }),

           ]
        }
     ],
    },
     buildDockItems: function(){
        return [
            this.buildDockTop()
        ];
     },

     buildDockTop: function(){
        return {
            xtype: 'topvoltarbar',
            title: 'Informacoes'
        };
     }

});
