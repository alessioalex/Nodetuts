// node --debug-brk app.js
// this must happen into Chrome -> http://localhost:8080/ 
// to see the debugger

var http = require('http');
http.createServer(function(request, response) {
    response.writeHead(200, {'Content-Type' : 'text/plain'});
    response.end('TTesting Node.js - Hello Node');
}).listen(4000);
console.log('Local server running on port 4000');
