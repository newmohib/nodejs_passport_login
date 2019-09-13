
const express = require('express');
const app = express();
const port = 4000;
const bcrypt = require('bcrypt');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const methodOverride = require('method-override');
const GoogleStrategy = require('passport-google-oauth20');
const passportConfig = require('./passport-config')

//


app.set('view-engine', 'ejs');
app.use(flash());
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
passport.use(passportConfig)

app.get('/', checkAuthenticated, (req, res) => {
    console.log("user", req.user);
    res.send(`Hello ${req.user.displayName}`);
});
app.get('/google', passport.authenticate('google', { scope: ['profile'] }));

app.get('/oauth',
    passport.authenticate('google', {
        successRedirect: '/',
        failureRedirect: '/login'

    }),

);

function checkAuthenticated(req, res, next) {
    console.log('checkAuthenticated', req.isAuthenticated());
    if (req.isAuthenticated()) {
        console.log('authenticated');
        return next();
    }
    res.redirect('/google');
}

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/google')
    }
    return next()
}

//midle














app.listen(port, function (e) {
    console.log('Server running at port', port);
});
