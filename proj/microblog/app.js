var express = require('express');
var http = require('http');
var path = require('path');
var util = require('util');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var partials = require('express-partials');

var routes = require('./routes');
var users = require('./routes/user');

var app = express();

app.set("title", "microBlog");
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('view options', {  layout: "layouts/layout.ejs" });

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(partials());

app.use(function(req, res, next){
    console.log('headers...');
    res.locals.headers = req.headers;
    next();
});

app.use(app.router);

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    console.log('404...');
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
app.configure('development', function () {
    app.use(function(err, req, res, next) {
        res.render('error', {
            title: err.message,
            message: err.message,
            error: err
        });
    });
});

// production error handler
// no stacktraces leaked to user
app.configure('production', function () {
    app.use(function(err, req, res, next) {
        res.render('error', {
            title: err.message,
            message: err.message,
            error: {}
        });
    });
});

// helper
app.locals({
  title: "Express",
  inspect: function (obj) {
    return util.inspect(obj, true);
  }
});

// router
app.get('/', routes.index);
app.get('/users', users.list);
app.get(/\/user\/(\w+$)/, function(req, res) {
    res.send('user:' + req.params[0]);
});
app.get('/list', function(req, res) {
    res.render('list', {
        title: 'list',
        items: [1991, 'huanghuiquan', 'express', 'Node.js']
    });
});
app.get('/headers', function(req, res) {
    res.render("helper");
});

module.exports = app;
