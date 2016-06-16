'use strict';

var express = require('express');
var app = express();
app.set('view engine', 'ejs');

var pg = require('pg');
var parser = require('body-parser');



//Write your own middleware function with app.use - to console log the request url path for every route.
app.use(express.static(__dirname + "/public"));

//redirect to home on an empty string
app.get('', function(req, res, next){
  res.redirect('/home');
});
//Write your own middleware that restricts access to /users so that when you attempt to
//access that route, you get sent to the home page ('/') - look up how to use res.redirect();
app.get('/users', function(req, res, next){
  //typically, let's redirect to a login page, but since we don't have cookie handlers yet let's go /home
 //res.redirect('/authenticate');
 res.redirect('/home');
});

app.get('/home', function(req, res, next){
  res.render('home', {});
  res.end();
});

// app.get('/users', function(req, res, next){
//   res.render('users', {});
// });

app.get('/err/:msg', function(req, res, next){
  if(req.params.msg === 'error')
  {
    next({err: req.params.msg}, req, res, next);
  }
  else {
    res.write("Must not be an error...");
    res.end();
  }
});

//saved for later
// app.get('/authenticate', function(req, res, next){
//   if (req.session.valid) {
//     req.render('users',{});
//   }
// });

//Write your own middleware ERROR function using app.use to display an error message when it gets used through next()
//Reference the docs: http://expressjs.com/en/guide/using-middleware.html

app.use(function(err, req, res, next) {
 console.error(err.stack);
 res.status(500).send('Something broke!');
 res.end();
});


var port = 3000;
app.listen(port, function(){
  console.log("App listening on: " + port);
});
