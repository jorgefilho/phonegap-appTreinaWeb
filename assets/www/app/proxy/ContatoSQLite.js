Ext.define('phonegap.proxy.ContatoSQLite', {
  extend: 'Ext.data.proxy.Proxy',
  alias: 'proxy.proxyContatoSQLite',

      read : function(operation, callback, scope){
          operation.setStarted();

          var thisProxy = this;

          //Abre conexão com o banco
          var db = window.openDatabase("Database", "1.0", "PhoneGap AppTreinaweb", 200000);

          db.transaction(
            function(tx){
              tx.executeSql('CREATE TABLE IF NOT EXISTS CONTATOS (id integer primary key autoincrement, nome, sobrenome, email, telefone)');

            tx.executeSql('SELECT * FROM CONTATOS',
              [],
              function(tx, results){
                var contatos = [];

                      for(var i = 0; i < results.rows.length; i++){

                        var row = results.rows.item(i);

                          var contato = Ext.create(thisProxy.getModel(), {
                            id : row.id,
                              nome : row.nome,
                              sobrenome : row.sobrenome,
                              email : row.email,
                              telefone : row.telefone
                          });

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
              function(error){
                console.log('error ' + error.code);
              });
            }
          );
      },

      update : function(operation, callback, scope){
          operation.setStarted();

          var thisProxy = this;

          //Pega o contato
          var contato = operation.getRecords()[0].data;

          //Abre conexão com o banco
          var db = window.openDatabase("Database", "1.0", "PhoneGap AppTreinaweb", 200000);

          db.transaction(
            function(tx){
              tx.executeSql(
                "UPDATE CONTATOS " +
                " SET nome = '" + contato.nome + "', " +
                "     sobrenome = '" + contato.sobrenome + "', " +
                "     email = '" + contato.email + "', " +
                "     telefone = '" + contato.telefone + "' " +
                " WHERE id = " + contato.id,
                [],
              function(tx, results){
                  operation.setSuccessful();
                      operation.setCompleted();

                      if(typeof callback == "function"){
                         callback.call(scope || thisProxy, operation);
                      }
              },
              function(error){
                console.log('error ' + error.code);
              }
              );
            }
          );
      },

      create : function(operation, callback, scope){
          operation.setStarted();

          var thisProxy = this;

          //Pega o contato
          var contato = operation.getRecords()[0].data;

          //Abre conexão com o banco
          var db = window.openDatabase("Database", "1.0", "PhoneGap AppTreinaweb", 200000);

          db.transaction(
            function(tx){
              tx.executeSql(
                  "INSERT INTO CONTATOS (nome, sobrenome, email, telefone) " +
                " VALUES ('" + contato.nome + "', '" + contato.sobrenome + "', " +
                      "'" +  contato.email + "', '" + contato.telefone + "')",
                [],
              function(tx, results){
                  operation.setSuccessful();
                      operation.setCompleted();

                      if(typeof callback == "function"){
                         callback.call(scope || thisProxy, operation);
                      }
              },
              function(error){
                console.log('erro ' + error.message);
              }
              );
            }
          );
      },

      destroy : function(operation, callback, scope){
          operation.setStarted();

          var thisProxy = this;

          //Pega o contato
          var contato = operation.getRecords()[0].data;

          //Abre conexão com o banco
          var db = window.openDatabase("Database", "1.0", "PhoneGap AppTreinaweb", 200000);

          db.transaction(
            function(tx){
              tx.executeSql(
                'DELETE FROM CONTATOS ' +
                ' WHERE id = ' + contato.id,
                [],
              function(tx, results){
                  operation.setSuccessful();
                      operation.setCompleted();

                      if(typeof callback == "function"){
                         callback.call(scope || thisProxy, operation);
                      }
              },
              function(error){
                console.log('error ' + error.code);
              }
              );
            }
          );
      }
    });
