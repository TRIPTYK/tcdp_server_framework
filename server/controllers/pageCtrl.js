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
  // console.log("router:"+dataPage.getLanguage())
  var pageObject = modelPages.searchPage(dataPage.getUrl(),dataPage.getLanguage());
  if (pageObject) {
    res.send(renderPage(pageObject));
    next();
  } else {
    res.status(404).send("<h1>The page"+ dataPage.getUrl() +" doesn't exist</h1>");
  }
})

module.exports = router
