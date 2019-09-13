const express = require('express');
const app = express();
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const passportConfig = require('./passport-config')


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
  passport.use(passportConfig)




app.get('/',checkAuthenticated,(req,res)=>{
    console.log("user",req.user.displayName);
    res.send(` Hello ${req.user.displayName} ` );
});
app.get('/okta', passport.authenticate('okta', {} ));

app.get('/oauth',
passport.authenticate('okta', {
    successRedirect: '/',
    failureRedirect: '/okta'
  }),

);



function checkAuthenticated(req,res,next){
    if (req.isAuthenticated()) {
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













const port = 4000;
app.listen(port, function (e) {
    console.log('Server running at port', port);
});
