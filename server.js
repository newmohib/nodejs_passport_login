const express = require('express');
const app = express();
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const passportConfig = require('./passport-config')
const { checkAuthenticated, checkNotAuthenticated } = require('./helper/middleware')


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


app.get('/', (req, res) => {
    res.render('index.ejs')
});

app.get('/home', checkAuthenticated, (req, res) => {
    console.log("user", req.user);
    res.render('home.ejs', { name: req.user.displayName })
});

app.get('/login', passport.authenticate('okta', {}));

app.get('/oauth',
    passport.authenticate('okta', {
        successRedirect: '/home',
        failureRedirect: '/'
    }),

);

app.get('/logout', (req, res) => {
    req.logOut()
    res.redirect('/')
})











const port = 4000;
app.listen(port, function (e) {
    console.log('Server running at port', port);
});
