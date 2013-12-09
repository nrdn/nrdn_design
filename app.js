var fs = require('fs');
var async = require('async');
var express = require('express');
    var app = express();

var mongoose = require('mongoose');
  var Schema = mongoose.Schema;
mongoose.connect('localhost', 'main');
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.locals.pretty = true;
// app.use(express.favicon(__dirname + '/public/img/favicon.ico'));
app.use(express.bodyParser({ keepExtensions: true, uploadDir:__dirname + '/uploads' }));
app.use(express.methodOverride());
app.use(express.cookieParser());
app.use(express.session({ secret: 'keyboard cat' }));
app.use(express.static(__dirname + '/public'));
app.use(function(req, res, next) {
  res.locals.session = req.session;
  next();
});
app.use(app.router);


// -------------------
// *** Model Block ***
// -------------------


var userSchema = new Schema({
   login: String,
    password: String,
    name: String,
   email: String,
  status: {type: String, default: 'User'},
    date: {type: Date, default: Date.now},
});

var workSchema = new Schema({
  tag: String,
  ru: {
    title: String,
    description: String
  },
  en: {
    title: String,
    description: String
  },
  images: [String],
  date: {type: Date, default: Date.now}
});

var postSchema = new Schema({
    ru: {
      title: String,
      body: String
    },
    en: {
      title: String,
      body: String
    },
    tag: String,
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    date: {type: Date, default: Date.now},
    images: [String],
});



var User = mongoose.model('User', userSchema);
var Work = mongoose.model('Work', workSchema);
var Post = mongoose.model('Post', postSchema);


// ------------------------
// *** Midleware Block ***
// ------------------------


function checkAuth (req, res, next) {
  if (req.session.user_id)
    next();
  else
    res.redirect('/login');
}


// ------------------------
// *** Main Block ***
// ------------------------


app.get('/', function(req, res) {
  res.render('index');
});

app.get('/works/:tag', function(req, res) {
  var tag = req.params.tag;

  Work.find({'tag': tag}).exec(function(err, works) {
    res.render('works', {works: works});
  });
});

app.post('/works', function(req, res) {
  var id = req.body.id;

  Work.findById(id, function(err, work) {
    res.send(work.ru.description)
  });
});

app.get('/blog/:tag', function(req, res) {
  var tag = req.params.tag;

  Post.find({'tag': tag}).exec(function(err, posts) {
    res.render('blog', {posts: posts});
  });
});

app.get('/post/:id', function(req, res) {
  var id = req.params.id;

  Post.findById(id, function(err, post) {
    Post.find({'tag':post.tag}).sort('-date').limit(6).exec(function(err, r_posts) {
      res.render('blog/post.jade', {post: post, r_posts: r_posts});
    });
  });
});


// ------------------------
// *** Static Block ***
// ------------------------


app.get('/about', function(req, res) {
  res.render('static/about.jade');
});

app.get('/srvices', function(req, res) {
  res.render('static/srvices.jade');
});

app.get('/concept', function(req, res) {
  res.render('static/concept.jade');
});

app.get('/contacts', function(req, res) {
  res.render('static/contacts.jade');
});


// ------------------------
// *** Login Block ***
// ------------------------


app.get('/auth', checkAuth, function (req, res) {
  res.render('auth');
});

// app.get('/auth/add/work', checkAuth, function (req, res) {
//   res.render('auth/add/work.jade');
// });

// app.post('/auth/add/work', function (req, res) {
//   var post = req.body;
//   var files = req.files;
//   var work = new Work();

//   work.tag = post.tag;
//   work.ru.description = post.ru.description;
//   if (post.en)
//     work.en.description = post.en.description;

//   fs.readFile(files.photo.path, function (err, data) {
//     var newPath = __dirname + '/public/images/works/' + work._id + '.jpg';
//     fs.writeFile(newPath, data, function (err) {
//       work.image = '/images/works/' + work._id + '.jpg';
//       work.save(function() {
//         fs.unlink(files.photo.path);
//         res.redirect('back');
//       });
//     });
//   });
// });


// ------------------------
// *** Add Post Block ***
// ------------------------


app.get('/auth/add/post', checkAuth, function (req, res) {
  res.render('auth/add/post.jade');
});

app.post('/auth/add/post', function (req, res) {
  var post = req.body;
  var files = req.files;
  var b_post = new Post();

  b_post.tag = post.tag;
  b_post.author = req.session.user_id;

  b_post.ru.title = post.ru.title;
  b_post.ru.body = post.ru.body;

  if (post.en) {
    b_post.en.title = post.en.title;
    b_post.en.body = post.en.body;
  }

  for (var i in files.photo) {
    files.photo[i].name = i;
  }

  async.forEach(files.photo, function(photo, callback) {
    fs.readFile(photo.path, function (err, data) {
      fs.mkdir(__dirname + '/public/images/posts/' + b_post._id, function() {
        var newPath = __dirname + '/public/images/posts/' + b_post._id + '/' + photo.name + '.jpg';
        fs.writeFile(newPath, data, function (err) {
          b_post.images.push('/images/posts/' + b_post._id + '/' + photo.name + '.jpg');
          callback();
        });
      });
    });
  }, function() {
    b_post.save(function() {
      res.redirect('back');
    });
  });
});


// ------------------------
// *** Edit Posts Block ***
// ------------------------


app.get('/auth/edit/posts', checkAuth, function (req, res) {
  Post.find().sort('-date').exec(function(err, posts) {
    res.render('auth/edit/posts', {posts:posts});
  });
});

app.get('/auth/edit/posts/:id', checkAuth, function (req, res) {
  var id = req.params.id;

  Post.findById(id, function(err, post) {
    res.render('auth/edit/posts/post.jade', {post:post});
  });
});

app.post('/auth/edit/posts/:id', function (req, res) {
  var id = req.params.id;
  var post = req.body;
  var files = req.files;

  Post.findById(id, function(err, b_post) {

    b_post.tag = post.tag;

    b_post.ru.title = post.ru.title;
    b_post.ru.body = post.ru.body;

    if (post.en) {
      b_post.en.title = post.en.title;
      b_post.en.body = post.en.body;
    }

    for (var i in files.photo) {
      files.photo[i].name = i;
    }

    async.forEach(files.photo, function(photo, callback) {
      fs.readFile(photo.path, function (err, data) {
        fs.mkdir(__dirname + '/public/images/posts/' + b_post._id, function() {
          var newPath = __dirname + '/public/images/posts/' + b_post._id + '/' + photo.name + '.jpg';
          fs.writeFile(newPath, data, function (err) {
            b_post.images.push('/images/posts/' + b_post._id + '/' + photo.name + '.jpg');
            callback();
          });
        })
      });
    }, function() {
      b_post.save(function() {
        res.redirect('back');
      });
    });
  });
});


// ------------------------
// *** Add Work Block ***
// ------------------------


app.get('/auth/add/work', checkAuth, function (req, res) {
  res.render('auth/add/work.jade');
});

app.post('/auth/add/work', function (req, res) {
  var post = req.body;
  var files = req.files;
  var work = new Work();

  work.tag = post.tag;

  work.ru.title = post.ru.title;
  work.ru.description = post.ru.description;

  if (post.en) {
    work.en.title = post.en.title;
    work.en.description = post.en.description;
  }

  for (var i in files.photo) {
    files.photo[i].name = i;
  }

  async.forEach(files.photo, function(photo, callback) {
    fs.readFile(photo.path, function (err, data) {
      fs.mkdir(__dirname + '/public/images/works/' + work._id, function() {
        var newPath = __dirname + '/public/images/works/' + work._id + '/' + photo.name + '.jpg';
        fs.writeFile(newPath, data, function (err) {
          work.images.push('/images/works/' + work._id + '/' + photo.name + '.jpg');
          callback();
        });
      });
    });
  }, function() {
    work.save(function() {
      res.redirect('back');
    });
  });
});


// ------------------------
// *** Edit Works Block ***
// ------------------------


app.get('/auth/edit/works', checkAuth, function (req, res) {
  Work.find().sort('-date').exec(function(err, works) {
    res.render('auth/edit/works', {works: works});
  });
});

app.get('/auth/edit/works/:id', checkAuth, function (req, res) {
  Work.findById(id, function(err, work) {
    res.render('auth/edit/works/work.jade', {work: work});
  });
});


app.get('/login', function (req, res) {
  res.render('login');
});

app.post('/login', function(req, res) {
  var post = req.body;

  User.findOne({ 'login': post.login, 'password': post.password }, function (err, person) {
    if (!person) return res.redirect('back');
    req.session.user_id = person._id;
    req.session.status = person.status;
    req.session.login = person.login;
    res.redirect('/auth');
  });
});


app.get('/logout', function (req, res) {
  delete req.session.user_id;
  delete req.session.login;
  delete req.session.status;
  res.redirect('back');
});


app.get('/registr', function(req, res) {
  if (!req.session.user_id)
    res.render('registr');
  else
    res.redirect('/');
});


app.post('/registr', function (req, res) {
  var post = req.body;

  var user = new User({
    login: post.login,
    password: post.password,
    email: post.email,
    name: post.name,
  });

  user.save(function(err, user) {
    if(err) {throw err;}
    console.log('New User created');
    req.session.user_id = user._id;
    req.session.login = user.login;
    req.session.status = user.status;
    res.redirect('/login');
  });
});


// ------------------------
// *** Other Block ***
// ------------------------


app.get('/error', function (req, res) {
  res.render('error');
});

app.get('*', function(req, res){
  res.render('error');
});


app.listen(3000);
console.log('http://127.0.0.1:3000')