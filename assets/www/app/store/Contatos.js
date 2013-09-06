Ext.define('phonegap.store.Contatos', {
  extend: 'Ext.data.Store',
   requires: [
        'phonegap.model.Contato',
        'phonegap.proxy.Contato',
   ],
    config: {
      storeId: "Contatos",
      model : 'phonegap.model.Contato',
      autoLoad : true,


  }
});
