Ext.define('phonegap.model.Contato', {
  extend: 'Ext.data.Model',
   requires: [
        'phonegap.proxy.ContatoSQLite',
   ],
  config: {
    idProperty: 'id',
    fields: [
         {
           name: 'id',
           type: 'int'
         },
         {
           name: 'nome',
           type: 'string'
         },
         {
           name: 'sobrenome',
           type: 'string'
      },
      {
        name: 'email',
        type: 'string'
      },
      {
        name: 'telefone',
        type: 'string'
      },
    ],

    // SQLite
    //proxy: {
    //  type: 'proxyContatoSQLite'
    //        },
      
    // localStorage
    proxy: {
                type: 'localstorage',
                id: 'contatos-app-localstore'
    },

    }
  });
