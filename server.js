const express = require('express');
const mongoose = require('mongoose');
const chalk = require('chalk');

// Express app
const app = express();

const {log} = console;

// MongoDB connection URL
// create 'boxingclub' database and import the test data using mongoimport:
//  -------------------------------------------------------------------------
// | mongoimport --db boxingclub --collection boxers --jsonArray boxers.json |
//  -------------------------------------------------------------------------
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
  // boxers route get all boxers
  app.route('/boxers').get((req, response) => {
    Boxer.find({active: true}, (err, doc) => {
      if (err) {
        log(err);
      }
      response.send(doc);
      return null;
    });
  });

  // Boxer route get boxer information
  app.route('/boxers/:firstname-:lastname').get((req, response) => {
    Boxer.findOne({
      firstname: {$regex: new RegExp(req.params.firstname, 'i')},
      lastname: {$regex: new RegExp(req.params.lastname, 'i')}
    }, (err, doc) => {
      if (err) {
        log(err);
      }
      response.send(doc);
      return null;
    });
  });

  // Handling 404
  app.route('*').get((req, response) => {
    log(checkCurrentRequest(req));
    response.status(404).send('<h1 style="color: red;">Page Not Fount [404]</h1>' + checkCurrentRequest(req));
  });
});

app.listen(3010, () => {
  log('👌  Express PoC is Ready: listengin on port 3010 [' + chalk.blue('http://localhost:3010') + ']');
});
