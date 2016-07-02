var express = require('express');
var path = require('path');
var compression = require('compression');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs  = require('express-handlebars');

var routes = require('./routes/index');

// REST API's
var usersRESTServiceAPI = require('./api/authentication');

var app = express();

app.use(compression());

// view engine setup
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'views/'));
app.engine('.hbs', exphbs( 
  { defaultLayout: 'main', 
    extname: '.hbs',
    layoutsDir: path.join(__dirname, 'views/layouts'), 
    partialsDir: path.join(__dirname, 'views/partials') 
  } ));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public/dist')));
app.use(express.static(path.join(__dirname, '..')));

  //  // serve all asset files from necessary directories
  //   app.use("/scripts", express.static(__dirname + "/distapp/js"));
  //   app.use("/img", express.static(__dirname + "/app/img"));
  //   app.use("/css", express.static(__dirname + "/app/css"));
  
  //   // any API endpoints
  //   app.post('/api/v1/auth/login', routes.auth.login);

  //   // serve index.html for all remaining routes, in order to leave routing up to angular
    // app.all("/*", function(req, res, next) {
    //     res.sendfile("index.html", { root: __dirname + "/app" });
    // });

app.use('/', routes);

// REST API's
//app.use('/api/authentication', usersRESTServiceAPI);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error.hbs', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error.hbs', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
