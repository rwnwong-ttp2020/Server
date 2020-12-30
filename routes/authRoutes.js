const passport = require('passport'); // this passport has nothing to do with passport.js;  it is referring to npm passport

module.exports =(app) => {

// we are exporting this function ot index.js and it will be used by app object
    //this is the route handler, reference express app object, state the type or method
    // first argument is path, second is code that get executed, like an arrow fn
    //here we call passport.authenticate with arguments
    //when user comes into the auth/google route, use next argument
    // the string google below references GoogleStrategy due to pre-existing internal
    //strategy or internal identifier
    //scope is an options object that specifies what access we want to have - attributes we want from the google profile

    app.get(
        '/auth/google',
        passport.authenticate('google', {
            scope: ['profile', 'email']//can also get contact list, images, etc
        })
    );

    //with only above app.get, we get a "cannot get error" but in the URL, we see the code that will be used to get
    //data from google:
    //code=4%2F1wECSFvjoOciQr8D45MFuvijfaA_-3PYoZd0agWXqiuosN_x-rgntMv77FPKzecMdHesghcW3IdhGzAKnpD_Uf4&scope=email+profile+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email+openid&authuser=0&prompt=consent#
    //now adding on next snippet of code - a route handler to do the code exchange:

    app.get('/auth/google/callback', passport.authenticate('google'));
    // this sends the code back to get the info that we want which in this case is profile and email address

    app.get('/api/logout', (req, res) => {
        req.logout();
        res.send(req.user);
    });
    
    
    app.get('/api/current_user', (req, res) => {
        res.send(req.user);
    });
};