var express = require('express'),
    form = require('connect-form'),
    fs = require('fs'),
    util = require('util');
    
var app = express.createServer(
  form({keepExtensions: true})
);

// switch between development and production like this:
// NODE_ENV=development node app.js
// OR 
// NODE_ENV=production node app.js

var MemStore = express.session.MemoryStore;

// this always executes, no matter of production or dev environment
app.configure(function(){
  // this logs in a Apache style
  // app.use(express.logger());
  app.use(express.bodyParser());
  // this middleware will override our method
  // with what we passed into the hidden variable _method
  app.use(express.methodOverride());
  // methodOverride must be after the bodyParser
  app.use(express.static(__dirname + '/static'));
  app.use(express.cookieParser());
  app.use(express.session({secret: 'alessios', store: MemStore({
    reapInterval: 60000 * 10
  })}));
});

app.configure('development', function() {
  app.use(express.logger());
  // this is the error handler, uncomment #1 to see it in action
  app.use(express.errorHandler({
    dumpExceptions: true,
    showStack : true
  }))
});

app.configure('production', function() {
  // this is the error handler for the production env
  app.use(express.errorHandler({
    dumpExceptions: false,
    showStack: false  
  }));
});

function requiresLogin(req, res, next) {
  if(req.session.user) {
    next();
  } else {
    res.redirect('/sessions/new?redir=' + req.url);
  }
}

app.set('views', __dirname + '/views');
app.set('view engine', 'jade')
// this is by default ->
// app.set('view options', {layout: true});
// if you don't want to have a layout though:
// app.set('view options', {layout: false});

//Registers dynamic view helpers. Dynamic view helpers are simply functions which accept req, res, and are evaluated against the Server instance before a view is rendered. The return value of this function becomes the local variable it is associated with.
app.dynamicHelpers({
  session: function(req, res){
    return req.session;
  },
  flash: function(req, res){
    return req.flash();
  }
});


app.get('/', function(req, res) {
  // #1 
  // throw new Error('this is just my custom error');
  // res.send('some text');
  res.render('root');
});

/* Sessions */

app.get('/sessions/new', function(req, res) {
  res.render('sessions/new', {locals: {
    redir: req.query.redir
  }});
});

app.get('/sessions/destroy', function(req, res) {
  delete req.session.user;
  res.redirect('/sessions/new');
});

var users = require('./users');

app.post('/sessions', function(req, res) {
  //console.log('User: ' + req.body.login + '; Pwd: ' + req.body.password);
  users.authenticate(req.body.login, req.body.password, function(user){
    if(user) {
      req.session.user = user;
      res.redirect(req.body.redir || '/');
    } else {
      req.flash('warn', 'Login failed');
      res.render('sessions/new', {locals: {
        redir: req.query.redir
      }});
    }
  });
});

var products = require('./products');
var photos = require('./photos');

app.get('/products', function(req, res) {
  res.render('products/index', {locals: {
    products: products.all
  }});
});

app.get('/products/new', requiresLogin,  function(req, res){
  res.render('products/new', {locals: {
    product: req.body && req.body.product || products.new
  }});  
});

app.post('/products', requiresLogin, function(req, res) {
  var id = products.insert(req.body.product);
  console.log(products.find(id));
  res.redirect('/products/' + id);
});

app.get('/products/:id', function(req, res) {
  var product = products.find(req.params.id);
  if(product != null) {
    res.render('products/show', {locals: {
      product: product
    }});
  } else {
    res.send('404 - Product not found!')
  }
});

app.get('/products/:id/edit', requiresLogin, function(req, res) {
  var product = products.find(req.params.id);
  if(product != null) {
    photos.list(function(err, photo_list) {
      if(err) {
        throw err;      
      } else {
        res.render('products/edit', {locals: {
          product: product,
          photos: photo_list
        }});            
      }
    });
  } else {
    res.send('404 - Product not found!')
  }
});

app.put('/products/:id', requiresLogin, function(req,res) {
  var id = req.params.id;
  products.set(id, req.body.product);
  // req.body.product comes from bodyParser
  res.redirect('/products/' + id);
});

/* Photos */

app.get('/photos', function(req, res) {
  photos.list(function(err, photo_list) {
    res.render('photos/index', {locals : {
      photos: photo_list
    }});
  });
});

app.get('/photos/new', function(req, res) {
  res.render('photos/new');
});

app.post('/photos', function(req, res) {
  req.form.complete(function(err, fields, files) {
    if(err) {
      next(err);
    } else {
      ins = fs.createReadStream(files.photo.path);
      ous = fs.createWriteStream(__dirname + '/static/uploads/photos/' + files.photo.filename);
      util.pump(ins, ous, function(err) {
        if(err) {
          next(err);
        } else {
          res.redirect('/photos');
        }
      });
      //console.log('\nUploaded %s to %s', files.photo.filename, files.photo.path);
      //res.send('Uploaded ' + files.photo.filename + ' to ' + files.photo.path);
    }
  });
});

/* 404 redirect here */
app.get('*', function(req, res) {
  res.send('404 - no such page');
});

app.listen(4000);

console.log('Server listening on port 4000');
