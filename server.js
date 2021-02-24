var express = require('express');
var port =  4000;
var app = express();

app.get('/', (req,res) => {
res.send('Hello World')
})

app.listen(port, () => {
    console.log('running at localhost: ' + port)
})