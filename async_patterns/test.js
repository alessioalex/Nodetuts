var insertElement = function(data, callback) {
  var timeout = Math.ceil(Math.random() * 3000);
  //console.log('timeout: ' + timeout.toString());
  setTimeout(function() {
    callback(null, data);
  }, timeout);
};

var insertAll = function(coll, callback) {
  var left = coll.length,
      elem;
  for(var i=0; i < coll.length; i++) {
    elem = coll[i];
    (function(elem) {
      insertElement(elem, function(err, _elem) {
        console.log(elem + ' inserted');
        if(--left == 0) {
          callback(); 
        }
      });
    })(elem);
  }
};

var coll = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

insertAll(coll, function() {
  console.log('END ?');
});
