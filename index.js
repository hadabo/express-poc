const express = require('express')
const app = express()

app.get('/', function(req,res){
  res.send('Hello world!')
})

app.listen(3010, function(){
  console.log('Example app listengin on port 3010!')
})
