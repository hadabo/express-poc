const assert = require('assert');
const express = require('express');
const mongo = require('mongodb').MongoClient;
const chalk = require('chalk');

const app = express();
const log = console.log;

// Connection URL
const url = 'mongodb://localhost:27017/express-mongo';

const currentRequest = function (req) {
	const fullUrl = req.protocol + '://' + req.get('Host') + req.url;
	const url = '⛔️ [' + chalk.yellow(req.method) + '] method on [' + chalk.blue(fullUrl) + '] URL is not supported yet!';
	return req ? url : false;
};

// HTTP Get Method routes
app.get('/', (req, res) => {
	const results = [];

  // Connect MongonDB to get the user-data results
	mongo.connect(url, (err, db) => {
		assert.equal(null, err);
		log(chalk.green('MongoDB is connected 👍🏻'));
		const cursor = db.collection('user-data').find();
		cursor.forEach((doc, err) => {
			assert.equal(null, err);
			results.push(doc);
		}, () => {
			db.close();
			if (results.length > 0) {
				log(chalk.green(results.length + ' Users found'));
			} else {
				log(chalk.red('Sorry, no users found!'));
			}
			res.json(results);
		});
	});
});

app.get('/about', (req, res) => {
	log(currentRequest(req));
	res.send(currentRequest(req));
});

// HTTP Get Method route with parameters
app.get('/user/:id/:name', (req, res) => {
	const user = {
		id: req.params.id,
		name: req.params.name
	};

	const results = [];

  // Connect MongonDB to get the user-data results
	mongo.connect(url, (err, db) => {
		assert.equal(null, err);
		log(chalk.green('MongoDB is connected 👍🏻'));
		const cursor = db.collection('user-data').find(user);
		cursor.forEach((doc, err) => {
			assert.equal(null, err);
			results.push(doc);
		}, () => {
			db.close();

			if (results.length > 0) {
				log(chalk.green('User found\n'));
			} else {
				log(chalk.red('User not found'), user);
			}

			res.json(results);
		});
	});
});

// HTTP Post Method routes
app.post('/', (req, res) => {
	log(currentRequest(req));
	res.send(currentRequest(req));
});

app.post('/about', (req, res) => {
	log(currentRequest(req));
	res.send(currentRequest(req));
});

// HTTP Post Method route with parameters
app.post('/user/:id/:name', (req, res) => {
	const user = {
		id: req.params.id,
		name: req.params.name
	};

  // Use connect method to connect to the server
	mongo.connect(url, (err, db) => {
		assert.equal(null, err);
		log(chalk.green('MongoDB is connected 👍🏻'));
		db.collection('user-data').insertOne(user, (err, res) => {
			assert.equal(null, err);
			log(chalk.green('New user inserted'), res.result);
			db.close();
		});
	});
	res.json({id: req.params.id, name: req.params.name});
});

// HTTP Put Method routes
app.put('/', (req, res) => {
	log(currentRequest(req));
	res.send(currentRequest(req));
});

app.put('/about', (req, res) => {
	log(currentRequest(req));
	res.send(currentRequest(req));
});

// HTTP Delete Method routes
app.delete('/', (req, res) => {
	log(currentRequest(req));
	res.send(currentRequest(req));
});

app.delete('/about', (req, res) => {
	log(currentRequest(req));
	res.send(currentRequest(req));
});

app.get('*', (req, res) => {
	log(currentRequest(req));
	res.status(404).send(currentRequest(req));
});

app.listen(3010, () => {
	log('👌  Express PoC is Ready: listengin on port 3010 [' + chalk.blue('http://localhost:3010') + ']');
});
