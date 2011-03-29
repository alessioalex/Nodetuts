var http = require('http'),
    fs = require('fs'),
    sys = require('sys'),
    step = require('step'),
    file_path = __dirname + '/web.gif',
    file_size;
    
step(
    function get_file_size() {
        fs.stat(file_path, this);
        // 'this' passes the result to the next function
    },
    function store_file_size(err, stat) {
        file_size = stat.size;
        this();
        // this() will call the next function
    },
    function read_file_into_memory() {
        fs.readFile(file_path, this);
    },
    function create_server(err, file_content) {    
        if(err) {
            throw err;
        };        
        http.createServer(function(request,response) {
            response.writeHead(200, {
                'Content-Type' : 'image/gif',
                'Content-Length' : file_size
            });                    
            response.end(file_content);
        }).listen(4000);
        console.log('Listening on port 4000.');        
    }
);
