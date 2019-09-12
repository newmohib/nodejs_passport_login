
const express = require('express');
const app = express();
const port = 4000;
const bcrypt = require('bcrypt');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const methodOverride = require('method-override');
const GoogleStrategy = require('passport-google-oauth20');
//const OktaStrategy = require('passport-okta-oauth')

//


app.set('view-engine', 'ejs');
app.use(flash());
// app.use(passport.initialize());
// app.use(passport.session());
// app.use(session({
//     secret:process.env.SESSION_SECRET,
//     resave:false,
//     saveUninitialized:false,
// }));

// required for passport session
app.use(session({
    secret: 'secrettexthere',
    saveUninitialized: true,
    resave: true,
  }));
  
  // Init passport authentication 
  app.use(passport.initialize());
  // persistent login sessions 
  app.use(passport.session());




const authenticateUser = (accessToken, refreshToken, userinfo, cb,done) => {
   
    //console.log("userinfo",userinfo);
    //console.log("cd",cb);
    if (userinfo == null) {
        return done(null, false, { message: 'No user with that email' })
    }else{
        return done(null, userinfo)
    }

}

passport.use(new GoogleStrategy({
    clientID: "692806867880-73s3obdnmg1uc5et4bv3jt50dbfuqscr.apps.googleusercontent.com",
    clientSecret: "ZLrdxMmDXzSW6d2gmUpCRp74",
    callbackURL: "http://localhost:4000/oauth"
}, authenticateUser))
passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (obj, done) {
    done(null, obj);
});


//medle






app.get('/',checkAuthenticated, (req,res)=>{
    res.send('Login success');
});
app.get('/google', passport.authenticate('google', { scope: ['profile'] }));

app.get('/oauth',
    passport.authenticate('google', {
        successRedirect: '/',
        failureRedirect: '/login'

    }),

);


function checkAuthenticated(req,res,next){
    console.log('checkAuthenticated', req.isAuthenticated());
    if (req.isAuthenticated()) {
        console.log('authenticated');
        return next();
    }
    res.redirect('/google');
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
