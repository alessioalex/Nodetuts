var insertElement = function(data, callback) {
  var timeout = Math.ceil(Math.random() * 3000);
  //console.log('timeout: ' + timeout.toString());
  setTimeout(function() {
    callback(null, data);
  }, timeout);
};

var insertAll = function(coll, callback) {
  // duplicate the array
  var queue = coll.slice(0),
      elem;
  (function iterate() {
    if(queue.length === 0) {
      callback();
      return;
    }
    elem = queue.splice(0, 1)[0];
    insertElement(elem, function(err, elem) {
      if(err) { throw err; }
      console.log(elem + ' inserted');
      //setTimeout(iterate, 0);
      process.nextTick(iterate);
    });
  })();
};

var coll = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

insertAll(coll, function() {
  console.log('END ?');
});
