// Usage: nodemon nodemon.js arguments

var http = require('http');
http.createServer(function(request, response) {
    response.writeHead(200, {'Content-Type' : 'text/plain'});
    response.end('TTesting Node.js - Hello Node');
}).listen(8000);
console.log('Local server running on port 8000');
