
const express = require('express');
const app = express();
const port = 4000;
const bcrypt=require('bcrypt');
const passport=require('passport');
const flash=require('express-flash');
const session=require('express-session');
const methodOverride=require('method-override');
const GoogleStrategy = require('passport-google-oauth20').Strategy;;

passport.use(new GoogleStrategy({
    clientID: "692806867880-73s3obdnmg1uc5et4bv3jt50dbfuqscr.apps.googleusercontent.com",
    clientSecret: "ZLrdxMmDXzSW6d2gmUpCRp74",
    callbackURL: "http://localhost:4000/oauth"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));

// passport.serializeUser(function(user, done) {
//     done(null, user);
//   });
  
//   passport.deserializeUser(function(obj, done) {
//     done(null, obj);
//   });

  app.get('/', function(req, res){
    res.render('Login success');
  });
app.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }));

app.get('/oauth', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });














app.listen(port,function(e){
    console.log('Server running at port',port);
});
