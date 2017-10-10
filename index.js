const express = require('express');
const chalk = require('chalk');

const app = express();
const log = console.log;

// HTTP Get Method routes
app.get('/', (req, res, next) => {
	log(chalk.yellow('get home page /'));
	next();
}, (req, res) => {
	res.json({res: 'Hello world!'});
});

app.get('/about', (req, res) => {
	res.send('This is a test for ExpressJs!');
});

// HTTP Get Method route with parameters
app.get('/user/:id/:name', (req, res) => {
	res.json({id: req.params.id, name: req.params.name});
});

// HTTP Post Method routes
app.post('/', (req, res) => {
	res.send('Post Hello world!');
});

app.post('/about', (req, res) => {
	res.send('Post This is a test for ExpressJs!');
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
