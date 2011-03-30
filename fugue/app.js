var fugue = require('fugue'),
    http =   require('http');

var server = http.createServer(function(req, res) {
  res.writeHead(200);
  res.end('Hello world! 22 222');
});

fugue.start(server, 4000, null, 2, {
  verbose : true,
  master_pid_path: '/tmp/master.pid'
});

//kill -USR2 `cat /tmp/master.pid`

