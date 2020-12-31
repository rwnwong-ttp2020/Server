// keys.js - figure out what set of credentials to return
if (process.env.NODE_ENV === 'production') {
    //we are in production - return the prod set of keys
    modules.exports = require('./prod');
} 
else {
    //we are in development - return the dev
    module.exports = require ('./dev');

}