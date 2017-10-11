const assert = require('assert');
const express = require('express');
const mongo = require('mongodb').MongoClient;
const chalk = require('chalk');

const app = express();
const log = console.log;

// Connection URL
const url = 'mongodb://localhost:27017/express-mongo';

// HTTP Get Method routes
app.get('/', (req, res, next) => {
	log(chalk.yellow('[/] route is called'));
	next();
}, (req, res) => {
	const results = [];

  // Connect MongonDB to get the user-data results
	mongo.connect(url, (err, db) => {
		assert.equal(null, err);
		const cursor = db.collection('user-data').find();
		cursor.forEach((doc, err) => {
			assert.equal(null, err);
			results.push(doc);
		}, () => {
			db.close();
			res.json(results);
		});
	});
});

app.get('/about', (req, res) => {
	res.send('This is a test for ExpressJs!');
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
		const cursor = db.collection('user-data').find(user);
		cursor.forEach((doc, err) => {
			assert.equal(null, err);
			results.push(doc);
		}, () => {
			db.close();
			res.json(results);
		});
	});
});

// HTTP Post Method routes
app.post('/', (req, res) => {
	res.send('Post Hello world!');
});

app.post('/about', (req, res) => {
	res.send('Post This is a test for ExpressJs!');
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
		log(chalk.green('MongoDB connected 👍🏻'));
		db.collection('user-data').insertOne(user, (err, res) => {
			assert.equal(null, err);
			log(chalk.green('User inserted'), res.result);
			db.close();
		});
	});
	res.json({id: req.params.id, name: req.params.name});
});

// HTTP Put Method routes
app.put('/', (req, res) => {
	res.send('Put Hello world!');
});

app.put('/about', (req, res) => {
	res.send('Put This is a test for ExpressJs!');
});

// HTTP Delete Method routes
app.delete('/', (req, res) => {
	res.send('Delete Hello world!');
});

app.delete('/about', (req, res) => {
	res.send('Delete This is a test for ExpressJs!');
});

app.listen(3010, () => {
	log('Example app listengin on port 3010! (' + chalk.blue('http://localhost:3010') + ')');
});
