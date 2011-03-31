var fs = require('fs'),
    src_path = __dirname + '/static/uploads/photos/';
    
module.exports.list = function(callback) {
  fs.readdir(src_path, function(err, files) {
    var ret_files = [];
    files.forEach(function(file){
      ret_files.push('/uploads/photos/' + file);
    });
    console.log(ret_files);
    callback(err, ret_files);
  });
}
