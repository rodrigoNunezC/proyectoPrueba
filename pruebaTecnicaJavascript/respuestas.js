        var constants = require('./pruebaTecnica.js');

        //0
        function listClientsIds() {
            var listClients = constants.const_clients;
            var lookupClientsIds = [];
            lookupClientsIds = listClients.map(x => x.id);
			
            return lookupClientsIds;
        }
		

        //1
        function listClientsIdsSortByTaxNumber(){
         	var listClients = constants.const_clients;

            listClients.sort(function(a,b) {
            var x = a.taxNumber;
            var y = b.taxNumber;
            return x < y ? -1 : x > y ? 1 : 0;;
            });
			
		
            return listClients;
        }
            listClientsIdsSortByTaxNumber();
        //2
        function sortClientsTotalBalances() {
            var listClients = constants.const_clients;
            var listAccount = constants.const_accounts;

             var result = listClients.filter(function(a){
                            a.totalBalence = 0;

                return !listAccount.some(function(b){
                        if(a.id  === b.clientId){
                            a.totalBalence += b.balance;
                        }
                });
             });

            
            result.sort(function(a,b) {
            var x = a.totalBalence;
            var y = b.totalBalence;
            return x > y ? -1 : x < y ? 1 : 0;
            });

            console.log(result);
            return result;
        }
         //3

         function banksClientsTaxNumbers(){
             var listClients = constants.const_clients;
             var listBanks = constants.const_banks;
             var listAccount = constants.const_accounts;

          var bank = {banks:[{clientsRut:[]}]};
          
           
             listAccount.filter(function(a){
                return !listClients.some(function(b){
                    if(a.clientId == b.id){
                      a.clientsRut = b.taxNumber; 
                      a.clientName = b.name;  
                    }    
                });
             });

            bank.banks = listBanks.filter(function(a){
                a.clients = [];
                return !listAccount.some(function(b){
                    if(a.id == b.bankId){
                        //name: b.clientName 
                        a.clients.push(b.clientsRut);
                    }    
                });
             });

             
             function uniqUsersByBanks() {
                 for (var i = 0; i < bank.banks.length; i++) {
                     bank.banks[i].clients = bank.banks[i].clients.filter(function (item, pos) {
                         return bank.banks[i].clients.indexOf(item) == pos;
                     });
                 }      
             }
            
             uniqUsersByBanks();
             // console.log(bank.banks);
             return bank;
        }

        banksClientsTaxNumbers();

        //4
        function richClientsBalances() {
            var listClients = constants.const_clients;
            var listAccount = constants.const_accounts;
           
            var listAccountBankSantander = listAccount.filter(x => x.bankId == 1);
            
            for (var j = 0; j < listClients.length; j++) {
            	listClients[j].totalBalance = 0;

                for (var i = 0; i < listAccountBankSantander.length; i++) {
                    if (listClients[j].id === listAccountBankSantander[i].clientId) {
                        listClients[j].totalBalance +=  listAccountBankSantander[i].balance;
                    }
                }
            }

        deleteClientsWhoAreNotBanckSantander(listClients);
            function deleteClientsWhoAreNotBanckSantander(listClients) {
                for (var i = 0; i < listClients.length; i++) {
                    if (listClients[i].totalBalance == 0) {
                        listClients.splice(i, 1);
                    }
                }
            }

            var orderClientsDecreasingly = listClients.slice(0);
        	orderClientsDecreasingly.sort(function(a,b) {
            var x = a.totalBalance;
            var y = b.totalBalance;
            return x > y ? -1 : x < y ? 1 : 0;
         });

        	return orderClientsDecreasingly;
        }

        //5
        function banksRankingByTotalBalance(){
          var listAccount = constants.const_accounts;
          var listBanks = constants.const_banks;

          for (var i = 0; i < listBanks.length; i++) {
          	listBanks[i].amount = 0;

          	for (var j = 0; j < listAccount.length; j++) {
          		if(listBanks[i].id === listAccount[j].bankId){
          			listBanks[i].amount += listAccount[j].balance;
          		}
          	}
          }

        	listBanks.sort(function(a,b) {
            var x = a.amount;
            var y = b.amount;
            return x < y ? -1 : x > y ? 1 : 0;
           });
            // console.log(listBanks);
        	return listBanks;
        }


        //6
        function banksFidelity() {
             var listClients = constants.const_clients;
             var listBanks = constants.const_banks;
             var listAccount = constants.const_accounts;

             var bank = {banks:[{clientsRut:[]}]};

             listAccount.filter(function(a){
                return !listClients.some(function(b){
                    if(a.clientId == b.id){
                      a.clientsRut = b.taxNumber; 
                      a.clientName = b.name;  
                    }    
                });
             });

            bank.banks = listBanks.filter(function(a){
                a.clients = [];
                return !listAccount.some(function(b){
                    if(a.id == b.bankId){
                        a.clients.push(b.clientsRut);
                    }    
                });
             });

             
             function uniqClientsByBanks() {
                 for (var i = 0; i < bank.banks.length; i++) {
                     bank.banks[i].clients = bank.banks[i].clients.filter(function (item, pos) {
                         return bank.banks[i].clients.indexOf(item) == pos;
                     });
                 }      
             }
             
             function countClientsByBank (){
                 for (var i = 0; i < bank.banks.length; i++) {
                     bank.banks[i].clients = bank.banks[i].clients.length;
                 }
             }
             uniqClientsByBanks();
             countClientsByBank();
             return bank;
        }

        // 7
        function banksPoorClients(){
             var listClients = constants.const_clients;
             var listBanks = constants.const_banks;
             var listAccount = constants.const_accounts;

        var bank = {
            banks: [{ id: null, nombre: null, client: { nombre: null, amount: null } }]
        };

        listAccount.filter(function (a) {
            return !listClients.some(function (b) {
                if (a.clientId == b.id) {
                    a.clientsRut = b.taxNumber;
                    a.clientName = b.name;
                }
            });
        });

        bank.banks = listBanks.filter(function (a) {
            a.clients = [];
            return !listAccount.some(function (b) {
                if (a.id == b.bankId) {
                    var cliente = { clientId: b.clientId, balance: b.balance, bancoId: b.bankId };
                    a.clients.push(cliente);
                }
            });
        });


        for (var i = 0; i < bank.banks.length; i++) {
            bank.banks[i].transactions = [];
                for (var u = 0; u < bank.banks[i].clients.length; u++) {
                    var totalAmount = bank.banks[i].clients.filter(x => x.clientId == bank.banks[i].clients[u].clientId).map(a => a.balance).reduce(function (a, b) { return a + b; }, 0);
                    if (totalAmount > 0){
                        var cliente = { cliente: bank.banks[i].clients[u].clientId, totalAmount: totalAmount };
                            bank.banks[i].transactions.push(cliente);
                        }
            }
        }

        uniqAmountByClients();
        function uniqAmountByClients() {
            for (var i = 0; i < bank.banks.length; i++) {
                bank.banks[i].transactions = removeDuplicates(bank.banks[i].transactions, "totalAmount");
                }
            }
        
        function removeDuplicates(myArr, prop) {
            return myArr.filter((obj, pos, arr) => {
                return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
            });
        }

        for (var i = 0; i < bank.banks.length; i++) {
            for (var a = 0; a < bank.banks[i].transactions.length; a++) {
                bank.banks[i].transactions = bank.banks[i].transactions.filter(x => x).reduce(function (prev, curr) {
                    return prev.Cost < curr.Cost ? prev : curr;
                });
            }
        }

        return bank;
    }


     // 8
        function newClientRanking(){
            var listClients = constants.const_clients;
            var listAccount = constants.const_accounts;

            var client = {id: 7, taxNumber: '1111111-1', name: 'Rodrigo Nuñez Cabrera', account:{ clientId: 7,bankId: 3,balance: 9000} };

            constants.const_clients.push({id: 7, taxNumber: '1111111-1', name: 'Rodrigo Nuñez Cabrera'});
            constants.const_accounts.push({clientId: 7,bankId: 3,balance: 9000});

           return sortClientsTotalBalances();
    }

                
          console.log('Pregunta 0');
console.log(listClientsIds());
console.log('Pregunta 1');
console.log(listClientsIdsSortByTaxNumber());
console.log('Pregunta 2');
console.log(sortClientsTotalBalances());
console.log('Pregunta 3');
console.log(banksClientsTaxNumbers());
console.log('Pregunta 4');
console.log(richClientsBalances());
console.log('Pregunta 5');
console.log(banksRankingByTotalBalance());
console.log('Pregunta 6');
console.log(banksFidelity());
console.log('Pregunta 7');
console.log(banksPoorClients());
console.log('Pregunta 8');
console.log(newClientRanking());

