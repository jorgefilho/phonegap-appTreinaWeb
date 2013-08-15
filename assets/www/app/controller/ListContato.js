Ext.define('phonegap.controller.ListContato', {
    extend:'Ext.app.Controller',
    
    config:{
    	
    	routes:{
    		'editor':'showEditor'
    	},
    	
    	refs:{
    		listaContato:'contatoLista',
    		editorContato:'#formContatoId',
    		backButton:'#btnVoltar',
    		addButton:'#topBarAddId',
    		saveButton:'#buttonBarSalvarId',
    		deleteButton:'#buttonBarExcluirId'
    	},
    	
    	control:{
    		backButton:{
    			tap:'onBackTap'
    		},
    		addButton:{
    			tap:'onAddButtonTap'
    		},
    		saveButton:{
    			tap:'onSaveButtonTap'
    		},
    		deleteButton:{
    			tap:'onDeleteButtonTap'
    		},
    		listaContato:{
    			select:'onListSelect'
    		},
    		editorContato:{
    			initialize:'onInitializeEditor'
    		}
    		
    	}
    	
    },
    
    requires:[
              'phonegap.view.ViewPort',
              'phonegap.view.contato.Lista',
              'phonegap.view.contato.Editor'
    ],
    
    
    showEditor: function(record){
    	if (record)
    		this.id = record.data.id;
    		
    	if (Ext.Viewport.items.findIndex('xtype', 'contatoEdito') == -1)
    		Ext.Viewport.add({
    			xtype:'contatoEditor'
    		});
    			
    	Ext.Viewport.setActiveItem({
    		xtype:'contatoEditor'
    	});
    	
    },
    
    
    onBackTap: function(){
    	history.back();
    	
    	Ext.Viewport.setActiveItem({
    		xtype:'contatoLista'
    	});
    	
    	this.id = null;
    	
    	var store = Ext.getStore("Contatos");
    	store.load();
    },
    
    onAddButtonTap:function(){
    	this.showEditor();
    },
    
    onSaveButtonTap:function(){
    	var editor = null;
    	
    	if (this.formEditor)
    		editor = formEditor;
    	else
    		editor = this.getEditorContato();
    	
    	
    	var newValues = editor.getValues();
    	
    	if (!this.id){
    		var record = Ext.create('phonegap.model.Contato', {
    			nome: newValues.nome,
    			sobrenome: newValues.sobrenome,
    			email:newValues.email,
    			telefone: newValues.telefone,
    		});
    		
    		record.save();
    		Ext.Msg.alert('Messagem', 'Contato salvo com sucesso');
    		editor.reset();
    	
    	}else{
    		var store = Ext.getStores("Contatos");
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
    			nome:'',
    			sobrenome:'',
    			email:'',
    			telefone:''
    		});
    		this.id = null;
    	}
    },
    
    onListSelect: function(list, record, eOpts){
    	this.showEditor(record);
    },
    
    onInitializeEditor: function(editor, eOpts){
    	this.form = editor;
    	if (this.id){
    		var store = Ext.getStore('Contatos');
    		var index = store.findExact('id', this.id);
    		var record = store.getAt(index);
    		
    		editor.setRecord(record);    		
    	}
    },
    
    onDeleteButtonTap: function(){
    	if (this.id){
    		Ext.Msg.alert('Confirmação!', 'Realmente deseja excluir o contato?', 
    				function(buttonId, value, opt){
    					if (buttonId == "yes"){
    						var store = Ext.getStore("Contatos");
    						var index = store.findExact('id', this.id);
    						
    						store.removeAt(index);
    						store.sync();
    						Ext.Msg.alert('Mensagem', 'Contato excluido com sucesso!');
    						this.id = null;
    						
    						var editor = null;
    						
    						if (this.formEditor)
    							editor = this.formEditor;
    						else
    							editor = this.getEditorAnotacao();
    						
    						editor.setValues({
    			    			nome:'',
    			    			sobrenome:'',
    			    			email:'',
    			    			telefone:''
    			    		});
    						
    				
    					}
    				}, this);
    	}else{
    		Ext.Msg.alert('Erro', 'Nenhum contato para ser excluido!');
    	}
    },
    
	
});