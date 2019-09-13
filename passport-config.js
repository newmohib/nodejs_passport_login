const passport = require('passport');
const OktaStrategy = require('passport-okta-oauth').Strategy




const authenticateUser = (accessToken, refreshToken, profile, done) => {
   
  //console.log("profile",profile);
  //console.log("cd",cb);
  if (profile == null) {
      return done(null, false, { message: 'No user with that email' })
  }else{
      return done(null, profile)
  }

}

  const passportConfig= new OktaStrategy({
    audience: "https://dev-411052.okta.com",
    //idp: process.env.OKTA_IDP,
    scope: ['openid', 'email', 'profile'],
    response_type: 'code',
    callbackURL: "http://localhost:4000/oauth",

    clientID: "0oa1c2m8l27N5W8wE357",
    clientSecret: "Ncq4LzAENpMAB8ecA1hYpJaZ0s_B4W9_O7BUCFYq",
}, authenticateUser);

passport.serializeUser(function(user, done){
    //console.log("serialize");
  done(null, user);
});

passport.deserializeUser(function(user, done) {
    //console.log("deserialize");
    done(null, user);
});


module.exports =passportConfig