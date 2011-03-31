var RandomStringGenerator = function(string_length) {
  this.string_length = string_length || 6;
};

RandomStringGenerator.prototype.generate = function() {
  var chars="abcdefghijklmnopqrstuwvxyz";
  var randomString = '';
  for(var i=0; i<this.string_length; i++) {
    var rnum = Math.floor(Math.random() * chars.length);
    randomString += chars.substring(rnum, rnum+1);
  }
  return randomString;
};

module.exports = RandomStringGenerator;

module.exports.create = function(string_length) {
  return new RandomStringGenerator(string_length);
};

// for inheritance, open for extension
module.exports._class = RandomStringGenerator;
