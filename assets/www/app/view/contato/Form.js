Ext.define('phonegap.view.contato.Form', {
  extend: 'Ext.form.Panel',
  xtype: 'formcontato',
  
  requires: [
    'Ext.form.FieldSet',
  ],
  
  config:{
    layout : 'fit',
    scroll : true,
    items: [ 
      {
        xtype: 'fieldset',
          items: [
              {
                  xtype : 'textfield',
                  name : 'nome',
                  label : 'Nome',
                  placeHolder : 'Nome do contato',
                  required : true
              },
              {
                  xtype : 'textfield',
                  name : 'sobrenome',
                  label : 'Sobrenome',
                  placeHolder : 'Sobrenome do contato',
                  required : true
              },
              {
                  xtype : 'textfield',
                  name : 'email',
                  label : 'E-mail',
                  placeHolder : 'E-mail do contato'
              },
              {
                  xtype : 'numberfield',
                  name : 'telefone',
                  label : 'Telefone'
              }
          ]
      }
    ]
  }
});
