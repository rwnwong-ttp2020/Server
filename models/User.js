const mongoose = require('mongoose');
//const Schema = mongoose.Schema;  this is same as next line
const { Schema } = mongoose; //destructuring - mongoose object has a property called schema.
                            //take that property and assign it to a new variable called Schema
const userSchema = new Schema({
    googleId: String
});

mongoose.model('users', userSchema); //want to create a collection called users. 
                                    //this creates a model class.

