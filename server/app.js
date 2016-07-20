var express = require('express');
var path = require('path');
var compression = require('compression');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs  = require('express-handlebars');

var routes = require('./routes/index');
var api = require('./routes/api');

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

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public/dist')));
app.use(express.static(path.join(__dirname, '..')));  // ????

app.use('/api', api);
app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found: ' + req.originalUrl + ' by Express.');
  err.status = 404;
  next(err);
});

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
