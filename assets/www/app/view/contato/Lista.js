Ext.define('phonegap.view.contato.Lista',{
    extend: 'Ext.dataview.List',
    xtype: 'contatoLista',
    
    requires: [
        'phonegap.view.toolbars.TopAdd',
        'phonegap.store.Contatos'
    ],
    
    config: {
        
      layout: {
          type: 'fit'
        },

        store: 'Contatos',
        
        itemTpl: [
          '<div class="list-item-title">{nome}</div>',
          '<div class="list-item-content">{telefone}</div>'
        ],
        
        listeners: {
          'render': function (thisComponent) 
            {
                thisComponent.getStore().load();
            }
        },
        
        items:[
            {
                docked: 'top',
                xtype: 'topaddbar',
                title: 'Contatos'
            }
        ]
    }
});
