
const express = require('express');
const app = express();
const port = 4000;
const bcrypt = require('bcrypt');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const methodOverride = require('method-override');
const GoogleStrategy = require('passport-google-oauth20');
const OktaStrategy = require('passport-okta-oauth').Strategy

//


app.set('view-engine', 'ejs');
app.use(flash());
app.use(session({
    secret: 'secrettexthere',
    saveUninitialized: true,
    resave: true,
}));
  
  // Init passport authentication 
  app.use(passport.initialize());
  // persistent login sessions 
  app.use(passport.session());



const authenticateUser = (accessToken, refreshToken, profile, done) => {
   
    console.log("profile",profile);
    //console.log("cd",cb);
    if (profile == null) {
        return done(null, false, { message: 'No user with that email' })
    }else{
        return done(null, profile)
    }

}

passport.use(new OktaStrategy({
    audience: "https://dev-411052.okta.com",
    //idp: process.env.OKTA_IDP,
    scope: ['openid', 'email', 'profile'],
    response_type: 'code',
    callbackURL: "http://localhost:4000/oauth",

    clientID: "0oa1c2m8l27N5W8wE357",
    clientSecret: "Ncq4LzAENpMAB8ecA1hYpJaZ0s_B4W9_O7BUCFYq",
}, authenticateUser))
passport.serializeUser(function(user, done){
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    done(null, id);
});


//medle




app.get('/',checkAuthenticated,(req,res)=>{
    res.send('Login success');
});
app.get('/okta', passport.authenticate('okta', {} ));

app.get('/oauth',
passport.authenticate('okta', {
    successRedirect: '/',
    failureRedirect: '/okta'
  }),

);


function checkAuthenticated(req,res,next){
    console.log('checkAuthenticated');
    if (req.isAuthenticated()) {
        console.log('authenticated');
        return next();
    }
    res.redirect('/okta');
}

function checkNotAuthenticated(req,res,next){
 if (req.isAuthenticated()) {
   return res.redirect('/google')
 }
 return next() 
}

//midle














app.listen(port, function (e) {
    console.log('Server running at port', port);
});
