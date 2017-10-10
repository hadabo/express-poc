const express = require('express')
const chalk = require('chalk')

const app = express()

app.get('/', function(req,res){
  res.send('Hello world!')
})

app.get('/about', function(req,res){
  res.send('This is a test for ExpressJs!')
})

app.listen(3010, function(){
  console.log('Example app listengin on port 3010! ('+ chalk.blue('http://localhost:3010') + ')')
})
