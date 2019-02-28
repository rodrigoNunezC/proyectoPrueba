var http = require("http");

http.createServer(function(req, res){
console.log("http://127.0.0.1:8080/index.html");
console.log("server ejecutandose en http://127.0.0.1:3000/");
}).listen(8080);

console.log("http://127.0.0.1:8080/index.html");