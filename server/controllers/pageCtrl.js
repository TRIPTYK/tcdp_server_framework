var express = require('express');
var router = express.Router();
var modelPages = require('../models/Pages.js');
var dataPage;
console.log("Init pageCtrl");


function renderPage(pageObject){
  console.log("render Page");

  return (pageObject);
}


router.use(function(req,res,next){
  dataPage = require('../models/Page.js')();
  dataPage.setLanguage(req.path);
  next();
});


router.use(function(req, res,next) {
  console.log("Use pageCtrl");
  console.log(dataPage.getLanguage())
  var id =req.path;
  var pageObject = modelPages.searchPage(id);
  if (pageObject) {
    res.send(renderPage(pageObject));
    next();
  } else {
    res.status(404).send("<h1>The page"+ id +" doesn't exist</h1>");
  }
})

module.exports = router
