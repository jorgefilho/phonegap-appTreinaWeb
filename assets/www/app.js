Ext.application({
    name: 'phonegap',

    proxy: ["Contato", "ContatoSQLite"],
    models: ["Contato"],
    stores: ["Contatos"],
    controllers: ["ListContato"],
    views: ["Viewport",
            "contato.Lista",
            "contato.Editor",
            "contato.Form",
            "toolbars.Top",
            "toolbars.TopBack",
            "toolbars.TopAdd",
            "toolbars.Bottom",
            "toolbars.BottomForm",
            "info.Panel",
            "file.Editor",
            "file.Form",
        ],

    launch: function()
    {
      var viewport = Ext.create('phonegap.view.contato.Lista');
      Ext.Viewport.add(viewport);
    }
});
