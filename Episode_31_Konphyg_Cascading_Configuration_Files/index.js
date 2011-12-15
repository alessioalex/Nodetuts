var cfg = require('konphyg')(__dirname + '/config');
var db_conf = cfg('database');

console.log('db_conf:', db_conf);

// try these commands in the terminal:
// node index.js
// NODE_ENV=production node index.js
// NODE_ENV=development node index.js
