//to get server running, go to terminal and type in node index.js or npm run dev
//go to browser and type in localhost:5000/auth/google


const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
//const { mongoURI } = require('./config/keys'); he doesn't have this any more when we set up Mongod
require('./services/passport');
mongoose.connect(keys.mongoURI);

const app = express();

require('./routes/authRoutes')(app);  // first parameter imports the authRoutes files which returns a function - we then immediately calls the fn with the app object.

const PORT = process.env.PORT || 5000;
app.listen(PORT);