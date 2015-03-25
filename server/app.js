var express = require('express');
var fs = require('fs');
var logger = require('morgan');
var _ = require('lodash');
var modelPages = require('./models/Pages.js');
var app = express();
app.use(logger());

app.all('*', function(req, res) {
  console.log(modelPages);
  var pageObject = modelPages.searchPage("/");
  if (pageObject) {
    res.send(pageObject);
  } else {
    res.status(404).send("<h1>This page doesn't exist</h1>");
  }
});

console.log("app listening at port 3000");
app.listen(3000);
