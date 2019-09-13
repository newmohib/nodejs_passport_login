const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');





  const authenticateUser = (accessToken, refreshToken, userinfo, callback) => {
    if (userinfo == null) {
        return callback(null, false, { message: 'No user with that email' })
    }else{
        return callback(null, userinfo)
    }

}
 const initialPassport=  new GoogleStrategy({
    clientID: "692806867880-73s3obdnmg1uc5et4bv3jt50dbfuqscr.apps.googleusercontent.com",
    clientSecret: "ZLrdxMmDXzSW6d2gmUpCRp74",
    callbackURL: "http://localhost:4000/oauth"
}, authenticateUser)

passport.serializeUser(function (userinfo, done) {
    done(null, userinfo);
});

passport.deserializeUser(function (userinfo, done) {
    done(null, userinfo);
});



module.exports =initialPassport