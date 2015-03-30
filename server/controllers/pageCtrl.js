var express = require('express');
var fs = require('fs');
var router = express.Router();
var hbs = require('handlebars');
var modelPages = require('../models/Pages.js');
var modelPartials=require('../models/Partials.js');
var dataPage;
console.log("Init pageCtrl");


modelPages.init("/datas/pages.json", function(err, data) {
  routeChain();
})
modelPartials.init("/static/partials/", function(err,data){

});

function routeChain() {
  router.use(function(req, res, next) {
    dataPage = require('../models/Page.js')();
    dataPage.setLanguage(req.path);
    // partials = require('../models/Partials.js')();
    next();
  });


  router.use(function(req, res, next) {
    console.log("Use pageCtrl");
    if (dataPage.getPageJson()) {
      next();
    } else {
      res.status(404).send("<h1>The page " + dataPage.getUrl() + " doesn't exist</h1>");
    }
  })



  router.use(function(req, res, next) {
    var data = dataPage.getPageJson();
    var templateToRender = process.cwd() + data.template + "-" + dataPage.getLanguage() + ".hbs";
    fs.readFile(templateToRender, function(err, data) {
      if (err) throw err;
      var source = data.toString("utf8");
      var template = hbs.compile(source);
      res.send(template())
        // res.send(template);
    })
  });
}


module.exports = router
