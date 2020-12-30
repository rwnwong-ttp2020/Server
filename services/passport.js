const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose'); //requiring the mongoose library
const keys = require('../config/keys');  // ./ means look in the current directory, so you need 2 dots

const User = mongoose.model('users'); //we don't use require statements with mongoose for collections
        //sometimes you need to load in the collection multiple times and this confuses mongoose
        //here we are fetching out of mongoose
        //User is the model class
passport.use(
    new GoogleStrategy(
        {
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback'   // this is the route that user will be sent back to after they grant permission
        }, 
        (accessToken, refreshToken, profile, done) => {
            //console.log('access token', accessToken);
            //console.log('refresh token', refreshToken);
            //console.log('profile', profile);
            User.findOne({ googleId: profile.id })
                .then((existingUser) => {
                    if (existingUser) {
                        //we already have a record with the given profile ID
                        done(null, existingUser);
                    }
                    else {
                        // we don't have a user record with this ID, make a new record
                        new User({ googleId: profile.id })  //this creates the instance
                        .save()
                        .then(user => done(null, user));  //this is the same instance but coming back from dB, so fresher version
                    //this creates one instance of a user, represents a user in our dB

                    }
                });
            
        }
    )
);