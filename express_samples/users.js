var users = {
  'pedro': {login: 'pedro', password: 'test', role: 'admin'},
  'alessio': {login: 'alessio', password: 'ronaldo', role: 'user'}
};
module.exports.authenticate = function(login, password, callback) {
  var user = users[login];
  if(!user) {
    callback(null);
    return;
  }
  if(user.password == password) {
    callback(user);
    return;
  }
  callback(null);
}
