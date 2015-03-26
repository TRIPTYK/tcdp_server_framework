var express = require('express');
var fs = require('fs');
var logger = require('morgan');

var app = express();
app.use(logger());

app.use(require('./controllers'));

console.log("app listening at port 3000");
app.listen(3000);
