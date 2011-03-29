var fs = require('fs');

module.exports = function() {
  return function(req, res, next) {
    fs.readFile(req.url.substr(1), function(err, data){
      if(err) {
        next(err);
      } else {
        res.writeHead(200, {'Content-Type': 'application/javascript'});
        res.end(data);
      }
    });
  }
};
