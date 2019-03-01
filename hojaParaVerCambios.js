var http = require("http");

http.createServer(function(req, res){



console.log('primer cambio de archivo');

console.log('otro cambio');
console.log('existe cambio');


console.log("server ejecutandose en http://127.0.0.1:3000/");
}).listen(8080);

