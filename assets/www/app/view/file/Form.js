Ext.define('phonegap.view.file.Form', {
  extend: 'Ext.form.Panel',
  xtype: 'formFile',

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
                  xtype : 'textareafield',
                  name : 'texto',
                    id: 'CadastroTextArea',
                  label : 'texto',
                  placeHolder : 'Digite um texto'
              },
             new Ext.Button({
                    text: 'Salvar',
                    id: 'buttonFileSalve'
             }),
          ]
      }
    ]
  }
});
