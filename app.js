var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
var indexRouter = require('./routes/index');

const User = require('./models/customer');

passport.use(new localStrategy({usernameField: 'email'},
    async function(username, password, done){
      try{
        const user  = await User.getUserByEmail(username);
        console.log("User login: ", user);
        if(!user){
            return done(null, false, {message: 'Incorrect email.'});
            console.log('Incorrect email.');

        }else{
          const isPasswordValid = await User.validPassword(username, password);
          if(!isPasswordValid){
            return done(null, false, {message:'Incorrect password' });
            console.log('Incorrect password', isPasswordValid);
          }
          return done(null, user);
        }
      }catch(ex){
       return done(ex);
     }
    }
));

passport.serializeUser(function(user, done){
  done(null, user.email);
});

passport.deserializeUser(function(email, done){
  const user = User.getUserByEmail(email);
  done(undefined, user);
});


var app = express();




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret:"meo cats"}));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var db = require('./db')
var PROD_DB_URI = process.env.PROD_DB_URI
db.connect(PROD_DB_URI,function(err, db) {
  if (err) {
    console.log('Unable to connect to Mongo.')
    process.exit(1)
  } else {
      console.log('Connect Mongodb Successfully...')
  }
})


app.use('/', indexRouter);
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

module.exports = app;
