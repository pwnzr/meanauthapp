const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

// Connect to database
mongoose.connect(config.database);

// On Connection
mongoose.connection.on('connected', () => {
  console.log('Connected to database: ' + config.database);
});

// On Error
mongoose.connection.on('error', (err) => {
  console.log('Database error: ' + err);
});

const app = express();

const users = require('./routes/users');

const port = 3000;

// CORS MW
app.use(cors());

// Set static folder (for frontend)
app.use(express.static(path.join(__dirname, 'public')));

// Body parser MW
app.use(bodyParser.json());

// Use /users for all of our user routes
app.use('/users', users);

// Passport MW
app.use(passport.initialize());
app.use(passport.session());

// TODO what's this?
require('./config/passport')(passport);

// Index route
app.get('/', (req, res) => {
  res.send('Invalid Endpoint');
});

// Start server
app.listen(port, () => {
  console.log('Server started on port: ' + port);
});
