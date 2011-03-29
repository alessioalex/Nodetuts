var net = require('net'),
    carrier = require('carrier'),
    connections = [];

net.createServer(function(conn) {
    connections.push(conn);
    
    conn.on('close', function() {
        var pos = connections.indexOf(conn);
        if(pos >= 0) {
            connections.splice(pos, 1);
        }
    });
    
    conn.write('Hello, welcome to this chat server!\n');
    conn.write('Please input your user name:\n');
    
    var username;
    
    carrier.carry(conn, function(line) {
        if(!username) {
            username = line;
            conn.write('Hello ' + username + '\n');
            return;
        }
        
        if(line == 'quit') {
            conn.end();
            return;
        }

        var feedback = username + ': ' + line + '\n';
        
        connections.forEach(function(one_connection) {
            if(conn != one_connection) {
                one_connection.write(feedback);
            }
        });
    });
    
}).listen(4000);

console.log('Use telnet localhost 4000 to test this example');
