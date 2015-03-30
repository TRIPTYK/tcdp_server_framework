var express = require('express');
var fs = require('fs');
var config = require('config');
var logger = require('morgan');

var app = express();
app.use(logger());

app.use(require('./controllers'));

console.log("app listening at port "+config.get('application.port'));
app.listen(config.get('application.port'));
