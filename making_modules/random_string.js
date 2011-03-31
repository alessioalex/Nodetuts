module.exports = function(string_length) {
  if(string_length == 0) {
    string_length = 6;  
  }
  var chars="abcdefghijklmnopqrstuwvxyz";
  var randomString = '';
  for(var i=0; i<string_length; i++) {
    var rnum = Math.floor(Math.random() * chars.length);
    randomString += chars.substring(rnum, rnum+1);
  }
  return randomString;
}
