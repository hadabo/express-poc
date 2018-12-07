const express = require('express');
const mongoose = require('mongoose');
const chalk = require('chalk');

// Express app
const app = express();

const {log} = console;

// MongoDB connection URL
const url = 'mongodb://localhost:27017/boxingclub';

// Boxer Schema
const boxerSchema = {
  firstname: String,
  lastname: String,
  email: String,
  active: Boolean
};

// Adding boxer model
const Boxer = mongoose.model('Boxer', boxerSchema, 'boxers');

// Helpers
const checkCurrentRequest = function (req, available = false) {
  const fullUrl = `${req.protocol}://${req.get('Host')}${req.url}`;
  const availableMsg = `✅ [${chalk.yellow(req.method)}] method on [${chalk.blue(fullUrl)}] URL is available!`;
  const notAvailableMsg = `⛔️ [${chalk.yellow(req.method)}] method on [${chalk.blue(fullUrl)}] URL is not available yet!`;
  return req && available ? availableMsg : notAvailableMsg;
};

// MongoDB connection
mongoose.connect(url, {useNewUrlParser: true});

const db = mongoose.connection;

// Log an error when the connection to MongoDB has an issue
db.on('error', console.error.bind(console, 'MongoDB -> connection error:'));

db.once('open', () => {
  // Now we're connected!

  // HTTP Get Method routes
  // home route
  app.get('/', (req, response) => {
    Boxer.find((err, doc) => {
      if (err) {
        log(err);
      }
      response.send(doc);
      return null;
    });
  });

  // Testing (about) route (for test purposes only)
  app.get('/about', (req, response) => {
    log(checkCurrentRequest(req, true));
    response.send(checkCurrentRequest(req, true));
  });

  // Handling 404
  app.get('*', (req, response) => {
    log(checkCurrentRequest(req));
    response.status(404).send('<h1 style="color: red;">Page Not Fount [404]</h1>' + checkCurrentRequest(req));
  });
});

app.listen(3010, () => {
  log('👌  Express PoC is Ready: listengin on port 3010 [' + chalk.blue('http://localhost:3010') + ']');
});
