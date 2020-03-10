// makes express and cors available for use in our app
const express = require('express');
const cors = require('cors');

//mongoose helps us connect to our MongoDB Database
const mongoose = require('mongoose');

require('dotenv').config();

// how we create our express server
const app = express();

//the port that our express server will be on
const port = process.env.PORT || 5000;

//cors middleware
app.use(cors());
//allows us to parse json
app.use(express.json());

//mongodb URI, need to get this from mongo db dashboard
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true }
);

const connection = mongoose.connection;

//once the conection is successful console log message
connection.once('open', () => {
    console.log('MongoDB database connection established successfully');
})

const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);


//starts the server, makes it listen to a particular port
app.listen(port, () => {
    console.log(`Server is running on port : ${port}`);
});
