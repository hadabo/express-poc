const express = require('express');
const mongoose = require('mongoose');
const chalk = require('chalk');

// Connection URL
const url = 'mongodb://localhost:27017/boxingclub';

// Data Sheets Schema
const boxerSchema = {
  firstname: String,
  lastname: String,
  email: String,
  active: Boolean
};

const Boxer = mongoose.model('Boxer', boxerSchema, 'boxers');

// Express app
const app = express();

const {log} = console;

// MongoDB connection
mongoose.connect(url, {useNewUrlParser: true});

const db = mongoose.connection;

// Log an error when the connection to MongoDB has an issue
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', () => {
  // We're connected!

  const checkCurrentRequest = function (request, available = false) {
    const fullUrl = request.protocol + '://' + request.get('Host') + request.url;
    const availableMsg = '✅ [' + chalk.yellow(request.method) + '] method on [' + chalk.blue(fullUrl) + '] URL is available!';
    const notAvailableMsg = '⛔️ [' + chalk.yellow(request.method) + '] method on [' + chalk.blue(fullUrl) + '] URL is not available yet!';
    return request && available ? availableMsg : notAvailableMsg;
  };

  // HTTP Get Method routes
  // home route
  app.get('/', (request, response) => {
    Boxer.find((err, doc) => {
      if (err) {
        log(err);
      }
      response.send(doc);
      return null;
    });
  });

  // About route (for test only)
  app.get('/about', (request, response) => {
    log(checkCurrentRequest(request, true));
    response.send(checkCurrentRequest(request, true));
  });

  // Handling 404
  app.get('*', (request, response) => {
    log(checkCurrentRequest(request));
    response.status(404).send('<h1 style="color: red;">Page Not Fount [404]</h1>' + checkCurrentRequest(request));
  });
});

app.listen(3010, () => {
  log('👌  Express PoC is Ready: listengin on port 3010 [' + chalk.blue('http://localhost:3010') + ']');
});
