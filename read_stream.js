var http = require('http'),
    fs = require('fs'),
    sys = require('sys'),
    file_path = __dirname + '/web.gif';
    
fs.stat(file_path, function(error, stat) {
    
    http.createServer(function(request,response) {

        response.writeHead(200, {
            'Content-Type' : 'image/gif',
            'Content-Length' : stat.size
        });
        
        var rs = fs.createReadStream(file_path);
        
        sys.pump(rs, response, function(err) {
            if(err) {
                throw err;
            }
        });
        
        // OR you can do all that, which is the same ->
        
        /*
        rs.on('data', function(content) {
            var flushed = response.write(content);
            if(!flushed) {
                rs.pause();
            }
        });
        response.on('drain', function() {
            rs.resume();
        });
        rs.on('end', function() {
            response.end();
        })*/
        
        
    }).listen(4000);
    console.log('Listening on port 4000.');
})
