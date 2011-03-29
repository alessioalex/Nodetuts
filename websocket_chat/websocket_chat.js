var http = require('http'),
    sys = require('sys'),
    fs = require('fs'),
    ws = require('./ws'),
    clients = [];

http.createServer(function(request, response) {
    response.writeHead(200, { 
        'Content-Type' : 'text/html'
    });
    
    var rs = fs.createReadStream(__dirname + '/websocket_chat.html');
    sys.pump(rs, response);
    
}).listen(4000);

ws.createServer(function(websocket) {

    var username;
            
    websocket.on('connect', function(resource) {
        clients.push(websocket);
        websocket.write('Welcome to this chat server!');
        websocket.write('Please input your username!');  
    });
    
    websocket.on('data', function(data) {
        if(!username) {
            username = data.toString();
            websocket.write('Welcome, ' + username + '!');
            return;        
        }
        
        var feedback = username + ' said: ' + data.toString();
        
        clients.forEach(function(client) {
            client.write(feedback);
        });    
    });
    
    websocket.on('close', function() {
        var pos = clients.indexOf(websocket);
        if(pos >= 0) {
            clients.splice(pos, 1);
        }
    });
}).listen(8080);
