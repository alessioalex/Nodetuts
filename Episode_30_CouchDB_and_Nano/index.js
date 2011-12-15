var nano = require('nano');
// make sure you change the connection data below
var server = nano('http://username:password@database.iriscouch.com');
var db = server.use('mydb');
var fs = require('fs');

/*
 * First part: without attachements
 *
 * /
var doc1 = { a: 1, b: 2, c: "abc", d: [1, 2, 3] };
// server.db.create('mydb', function(err) {
  // if (err) { throw err; }
  // console.log('created mydb');
db.get('doc_one', function(err, val) {
  if (err) { throw err; }
  console.log('Got value of doc_one: ', val);
  val.f = 2;
  db.insert(val, function(err) {
    if (err) { throw err; }
    console.log('inserted object1');
    db.get('doc_one', function(err, val) {
      console.log('doc_one = ', val);
    });
  });
  // ## Remember: paralell stuff is bound to fail -> MVCC
  // db.insert(val, function(err) {
  //   if (err) { throw err; }
  //   console.log('inserted object1');
  //   db.get('doc_one', function(err, val) {
  //     console.log('doc_one = ', val);
  //   });
  // });
});
// });
*/

/*
 * Part two: sending an attachment
 *
 */
/*
// var readStream = fs.createReadStream(__dirname + '/photo1.jpg');
var readStream = fs.createReadStream(__dirname + '/photo2.jpg');
// update photo
// remove revision if you insert the first time
readStream.pipe(db.attachment.insert(
  'doc_two',
  'my_photo',
  null,
  'image/jpeg',
  { rev: '1-42dec88a6059953b38df3676d030e689' }
));
*/

/*
 * Part three: getting an attachment
 *
 */
/*
var writeStream = fs.createWriteStream('/tmp/my_photo.jpg');
db.attachment.get('doc_two', 'my_photo').pipe(writeStream);
*/
