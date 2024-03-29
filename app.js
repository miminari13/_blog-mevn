var createError = require('http-errors');
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// create db 'blog', add collection 'users' and fill by docs
// ex: db.users.insert({"name":"Peter","email":"peter1111@mongo.com"})
let usersDB = 'blog'; 
// connect mongodb
mongoose.connect(`mongodb://localhost:27017/${usersDB}`, function(){
	console.log('Connected to local db')
})
.catch(err => {
	console.error('App starting error:' , err.stack);
	process.exit(1);
})

// file system
var fs = require('file-system');
// controllers
fs.readdirSync('controllers').forEach(function (file) {
	if(file.substr(-3) == '.js') {
		const route = require('./controllers/' + file);
		route.controller(app);
	}
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(3000, function(){ console.log('listening on 3000')});

module.exports = app;
