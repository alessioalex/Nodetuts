var http = require('http'),
    fs = require('fs'),
    file_path = __dirname + '/web.gif';
    
fs.stat(file_path, function(error, stat) {
    
    http.createServer(function(request,response) {

        response.writeHead(200, {
            'Content-Type' : 'image/gif',
            'Content-Length' : stat.size
        });
        
        fs.readFile(file_path, function(error, file_content) {
             response.write(file_content);
             response.end();
        });
        
    }).listen(4000);
    console.log('Listening on port 4000.');
})
