// Usage: 
// spark2 -v -n 2 -E development --watch

var http = require('http');
module.exports = http.createServer(function(request, response) {
    response.writeHead(200, {'Content-Type' : 'text/plain'});
    response.end('TTesting Node.js - Hello Node');
});
