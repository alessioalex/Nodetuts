// Usage: 

var http = require('http');
module.exports = http.createServer(function(request, response) {
    response.writeHead(200, {'Content-Type' : 'text/plain'});
    response.end('TTesting Node.js - Hello Node');
});
