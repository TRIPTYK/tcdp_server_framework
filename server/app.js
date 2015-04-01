var express = require('express');
var path = require('path');
var fs = require('fs');
var config = require('config');
var logger = require('morgan');

var app = express();
// app.use(logger());
app.use(express.static(path.join(process.cwd(),'public')));
app.use(require('./controllers'));
var port = process.port || parseInt(config.get('application.port'))
console.log("app listening at port "+ port);
app.listen(port);
