Ext.define('phonegap.proxy.Contato', {
  extend: 'Ext.data.proxy.Proxy',
  alias: 'proxy.proxyContato',

  read: function(operation, callback, scope){
            var thisProxy = this;
      
            navigator.contacts.find(['id', 'name', 'emails', 'phoneNumbers'],//Filtro

                function(deviceContatos){//Função de sucesso

                    var contatos = [];

                    for(var i = 0; i < deviceContatos.length; i++){
                        var deviceContato = deviceContatos[i];
                        var contato = Ext.create(thisProxy.getModel(), {
                           id : deviceContato.id,
                           nome : deviceContato.name.givenName,
                           sobrenome : deviceContato.name.familyName,
                           email : ((deviceContato.emails != null) ? deviceContato.emails[0].value : ''),
                           telefone : ((deviceContato.phoneNumbers!= null) ? deviceContato.phoneNumbers[0].value : '')
                        });
                        contato.deviceContato = deviceContato;
                        contatos.push(contato);
                    }
                                  
                    
          operation.setResultSet(Ext.create('Ext.data.ResultSet', {
              records: contatos,
              total  : contatos.length
          }));

                    operation.setSuccessful();
                    operation.setCompleted();

                    if(typeof callback == "function"){
                       callback.call(scope || thisProxy, operation);
                    }
                },

                function(erro){ //Função de erro
                    console.log('erro ao ler os contatos');
                },
                {//Exibir todos os contatos
                    multiple: true
                }
            );

   },
   
   create: function(operation, callback, scope){
	   operation.setStarted();

	   var thisProxy = this;

	   //Cria um deviceContato
	   var deviceContato = navigator.contacts.create();

	   var contato = operation.getRecords()[0].data;

	   //Adiciona os dados do contato
	   var name = new ContactName();
	   name.givenName = contato.nome;
	   name.familyName = contato.sobrenome;

	   deviceContato.name = name;

	   var emails = [1];
	   emails[0] = new ContactField('home', contato.email, false);

	   deviceContato.emails = emails;

	   var phoneNumbers = [1];
	   phoneNumbers[0] = new ContactField('mobile', contato.telefone, false);

	   deviceContato.phoneNumbers = phoneNumbers;

	   //Salva o contato no dispositivo
	   deviceContato.save(function(){
	     operation.setSuccessful();
	     operation.setCompleted();
	     if(typeof callback == "function"){
	        callback.call(scope || thisProxy, operation);
	     }
	   });
	 },
	 
	 update: function(operation, callback, scope){

		  operation.setStarted();

		  //Pega o deviceContato
		  var deviceContato = operation.getRecords()[0].deviceContato;
		  var contato = operation.getRecords()[0].data;
		  var thisProxy = this;

		  //Adiciona os novos dados do contato
		  deviceContato.name.givenName = contato.nome.toString();
		  deviceContato.name.familyName = contato.sobrenome.toString();

		  if(deviceContato.emails == null){
		    var emails = [1];
		    emails[0] = new ContactField('home', contato.email, false);

		    deviceContato.emails = emails;
		  }
		  else
		    deviceContato.emails[0].value = contato.email.toString();

		  console.log(contato.email.toString());

		  deviceContato.phoneNumbers[0].value = contato.telefone.toString();

		  //Salva o contato no dispositivo
		  deviceContato.save(function(){
		 
		    operation.setSuccessful();
		    operation.setCompleted();

		    if(typeof callback == "function"){
		       callback.call(scope || thisProxy, operation);
		    }
		  },
		  function(contactError) {
		    alert("Error = " + contactError.code);
		  });
		},
		
		destroy: function(operation, callback, scope) {
		    operation.setStarted();

		    var thisProxy = this;

		    //Pega o deviceContato
		    var deviceContato = operation.getRecords()[0].deviceContato;

		    //Remove o contato do dispositivo
		    deviceContato.remove(function(contact){
		      operation.setSuccessful();
		      operation.setCompleted();

		      if(typeof callback == "function"){
		          callback.call(scope || thisProxy, operation);
		      }
		    });
		}


});
