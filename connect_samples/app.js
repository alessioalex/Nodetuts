var connect = require('connect');

connect.createServer(
  require('./log-it')(),
  require('./serve-js')()
).listen(4000);

console.log('Server listening on port 4000.');
