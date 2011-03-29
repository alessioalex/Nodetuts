var http = require('http'),
    sys  = require('sys'),
    fs   = require('fs'),
    io   = require('socket.io');

var server = http.createServer(function(request, response) {
  response.writeHead(200, {
    'Content-Type': 'text/html'
  });
  
  var rs = fs.createReadStream(__dirname + '/template.html');
  sys.pump(rs, response);
  
});

var socket = io.listen(server);

socket.on('connection', function(client) {
  
  var username;
  
  client.send('Welcome to this socket.io chat server!');
  client.send('Please input your username: ');
  
  client.on('message', function(message) {
    if (!username) {
      username = message;
      client.send('Welcome, ' + username + '!');
      return;
    }
    
    socket.broadcast(username + ' sent: ' + message);
  });
  
});

server.listen(4000);
