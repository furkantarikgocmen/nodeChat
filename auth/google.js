const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');

//models
const User = require('../models/users.js')

passport.use(
    new GoogleStrategy({
    clientID : process.env.GOOGLE_LOGIN_CLIENT_ID,
    clientSecret : process.env.GOOGLE_LOGIN_SECRET_ID,
    callbackURL: process.env.GOOGLE_LOGIN_CALLBACK_URL
    },
    ((accessToken, refreshToken, profile, done) => {
        const data = profile._json;
        //console.log(data)

        User.findOrCreate({
            'googleId' : data.sub // bu bana sub olarak döndü?
        }, {
            name: data.given_name,
            surname: data.family_name, //bu ikisi de given_name ve family_name olarak döndü?
            profilePhotoUrl: data.picture //bu bende picture
        },(err, user) => {
            return done(err, user);
        })
    })
));

passport.serializeUser((user, done) => {
   done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});


module.exports = passport;