var express = require('express');
var fs = require('fs');
var logger = require('morgan');
var _ = require('lodash');
var app = express();
app.use(logger());
var modelPage;
fs.readFile("pages.json", function(err, data) {
  if (err) return console.log(err);
  modelPage = JSON.parse(data).pages;
});


function searchPage(id, model) {
  return _.find(model, {
    "idName": id
  });
}


app.all('*', function(req, res) {
  var pageObject = searchPage(req.path, modelPage);
  if (pageObject) {
    res.send(req.path)
  } else {
    res.status(404).send("<h1>This page doesn't exist</h1>");

  }
});

console.log("app listening at port 3000");
app.listen(3000);
