const express = require('express');
const app = express();
var cors = require('cors')
const port = 4000;
const bcrypt = require('bcrypt');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const methodOverride = require('method-override');
const GoogleStrategy = require('passport-google-oauth20');
const passportConfig = require('./passport-config')
const { checkAuthenticated, checkNotAuthenticated } = require('./helper/middleware')



app.set('view-engine', 'ejs');
app.use(flash());
app.use(cors())
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


app.get('/', (req, res) => {
    res.render('index.ejs')
});

app.get('/home', checkAuthenticated, (req, res) => {
    console.log("user", req.user);
    res.render('home.ejs', { name: req.user.displayName })
});

app.get('/login', passport.authenticate('google', { scope: ['profile'] }));

app.get('/oauth',
    passport.authenticate('google', {
        successRedirect: "http://localhost:3000",
        failureRedirect: "/"

    }),

);

app.get('/login/success', (req, res) => {
    res.send({status:200})
});

app.get('/logout', (req, res) => {
    req.logOut()
    res.redirect("/")
})















app.listen(port, function (e) {
    console.log('Server running at port', port);
});
