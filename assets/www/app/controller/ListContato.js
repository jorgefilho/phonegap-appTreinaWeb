Ext.define('phonegap.controller.ListContato', {
  extend: 'Ext.app.Controller',

  config: {
      routes: {
          'editor' : 'showEditor'
      },

      refs: {
          listaContato: 'contatoLista',
          editorContato: '#formContatoId',
          backButton: '#btnVoltar',
          addButton: '#topBarAddId',
          saveButton: '#buttomBarSalvarId',
          deleteButton: '#buttonBarExcluirId',
          infoButton: '#topBarInfoId',
          startButton: '#panelButtonStartAudio',
          execButton: '#panelButtonStartRecAudio'
      },

      control: {
      backButton: {
          tap: 'onBackTap'
        },
        addButton: {
          tap: 'onAddButtonTap'
        },
        saveButton: {
        tap: 'onSaveButtonTap'
        },
        deleteButton: {
        tap: 'onDeleteButtonTap'
        },
        listaContato: {
        select: 'onListSelect'
        },
        editorContato: {
        initialize: 'onInitializeEditor'
        },
          infoButton: {
            tap: 'onInfoButtonTap'
          },
          startButton: {
            tap: 'onStartButtonTap'
          },
          execButton: {
            tap: 'onExecButtonTap'
          },

      }

  },

  requires: [
     'phonegap.view.Viewport',
     'phonegap.view.contato.Lista',
     'phonegap.view.contato.Editor'
  ],

  showEditor: function(record){
  if(record)
    this.id = record.data.id;

    if(Ext.Viewport.items.findIndex('xtype', 'contatoEditor') == -1)
      Ext.Viewport.add({
            xtype: 'contatoEditor'
      });

    Ext.Viewport.setActiveItem({
       xtype: 'contatoEditor'
    });
  },

  onBackTap: function(){
    history.back();

    Ext.Viewport.setActiveItem({
        xtype: 'contatoLista'
    });

    this.id = null;

    var store = Ext.getStore("Contatos");
    store.load();
  },

  onAddButtonTap: function(){
    this.showEditor();
  },



  onSaveButtonTap: function(){
  var editor = null;
  if(this.formEditor)
    editor = this.formEditor;
  else
    editor = this.getEditorContato();


  var newValues = editor.getValues();

  if(!this.id){
    var record = Ext.create('phonegap.model.Contato', {
        nome     : newValues.nome,
        sobrenome: newValues.sobrenome,
        email    : newValues.email,
        telefone : newValues.telefone,

    });
    record.save();
    Ext.Msg.alert('Mensagem', 'Contato salvo com sucesso');
    editor.reset();
  }
  else
  {
    var store = Ext.getStore("Contatos");
    var index = store.findExact('id', this.id);
    var record = store.getAt(index);

    record.set('nome', newValues.nome);
    record.set('sobrenome', newValues.sobrenome);
    record.set('email', newValues.email);
    record.set('telefone', newValues.telefone);

    console.log(newValues.sobrenome);

    record.setDirty();
    store.sync();

    Ext.Msg.alert('Mensagem', 'Contato alterado com sucesso');
    editor.setValues({
      nome: '',
      sobrenome: '',
      email: '',
      telefone: ''
    });
    this.id = null;
  }
  },

  onListSelect: function(list, record, eOpts){
     this.showEditor(record);
  },

  onInitializeEditor: function(editor, eOpts){
  this.formEditor = editor;
    if(this.id)
  {
      var store = Ext.getStore("Contatos");
      var index = store.findExact('id', this.id);
      var record = store.getAt(index);
    editor.setRecord(record);
    }
  },

  onDeleteButtonTap: function()
  {
  if(this.id){
        Ext.Msg.confirm('Confirmação!', 'Realmente deseja excluir o contato',
          function(buttonId, value, opt){
              if(buttonId == "yes"){
                var store = Ext.getStore("Contatos");

                var index = store.findExact('id', this.id);
                store.removeAt(index);
                store.sync();
                Ext.Msg.alert('Mensagem', 'Contato excluido com sucesso');
                this.id = null;

                var editor = null;
        if(this.formEditor)
          editor = this.formEditor;
          else
           editor = this.getEditorAnotacao();

        editor.setValues({
          nome: '',
          sobrenome: '',
          email: '',
          telefone: ''
        });
            }
        }, this);
  }
    else{
        Ext.Msg.alert('Erro', 'Nenhum contato para ser excluído!');
    }
  },

  //Função chama a view info
   onInfoButtonTap: function()
  {
    Ext.Viewport.setActiveItem({
    xtype: 'infoPanel'
    })
  },

  //Função iniciar audio
  onStartButtonTap: function()
  {

    var path;
      navigator.device.capture.captureAudio(
    function(mediaFiles){
      for(var i =0; i < mediaFiles.length; i++){
              path = mediaFiles[i].fullPath;
      }
    },
    function(error){
      console.log('Erro codigo: ' + error.code);
    },
    {limit:1});

    if(path){
      this.my_media=new Media(
            path,
      function(){},
      function(error){
              console.log('code: '    + error.code    + '\n' +
      'message: ' + error.message + '\n');
      });
    }
   },


   execButtonTap: function()
   {
    if(this.my_media){
        this.my_media.play();
    }
   },

});
