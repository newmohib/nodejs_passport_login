const LocalStrategy=require('passport-local').Strategy;
const GoogleStrategy = require('passport-google').Strategy;
const bcrypt=require('bcrypt');

function initialize(passport,getUserByEmail,getUserById){
    // const authenticateUser = async (email,password,done)=>{
    //     const user =getUserByEmail(email);
    //     if (user == null) {
    //         return done(null,false,{message:'No user with that email'})
    //     }
    //     try {
    //         if (await bcrypt.compare(password,user.password)) {
    //             return done(null, user)
                
    //         } else {
    //             return done(null, false, {message:'Password incorrect'})
                
    //         }
    //     } catch (e) {
    //         return done(e)
            
    //     }

    // }

    passport.use(new GoogleStrategy({
        returnURL: 'http://localhost:4000/auth/google/return',
        realm: 'http://localhost:4000/'
      },
      function(identifier, profile, done) {
        // asynchronous verification, for effect...
        process.nextTick(function () {
          
          // To keep the example simple, the user's Google profile is returned to
          // represent the logged-in user.  In a typical application, you would want
          // to associate the Google account with a user record in your database,
          // and return that user instead.
          profile.identifier = identifier;
          return done(null, profile);
        });
      }
    ));
    passport.serializeUser(function(user, done) {
        done(null, user);
      });
      
      passport.deserializeUser(function(obj, done) {
        done(null, obj);
      });
}

module.exports =initialize