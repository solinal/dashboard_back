const express = require('express');
const jwt = require('jsonwebtoken');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var cors = require('cors');
var logger = require('morgan');
var path = require('path');

var loginSession = require('./routes/login');
var ordersRouter = require('./routes/orders');
var profileSession = require('./routes/profile');
var userRouter = require('./routes/users');
const verifyToken = require('./routes/validate-token');
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested With, Content-Type, Accept');
  next();
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));

app.use('/login', loginSession);
//app.use('/payment', verifyToken, ordersRouter);
app.use('/payment', ordersRouter);
app.use('/profile', profileSession);
app.use('/users', userRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(3000, function () {
  console.log('Server running on port 3000. http://localhost:3000');
});