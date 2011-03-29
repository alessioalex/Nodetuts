var http = require('http'),
    spawn = require('child_process').spawn;
    
http.createServer(function(request,response) {
    
    response.writeHead(200, {
        'Content-Type' : 'text/plain'
    });
    
    var tail_child = spawn('tail', ['-f', '/var/log/vsftpd.log']);
    
    tail_child.stdout.on('data', function(data){
        console.log(data.toString());
        response.write(data);
    })
    
    request.connection.on('end', function(data) {
        tail_child.kill();    
    })
    
}).listen(4000);
