var fs = require('fs');
var _ = require('lodash');
var modelPages = require('../models/Pages.js');
var config = require('config');

function pageDataModel() {
  console.log('pageDataModel initialized');
  var that = {};

  //PRIVATES VARIABLES
  var language;
  var pageUrl;
  var pageJson;

  function getLanguage() {
    return language;
  }

  function setLanguage(tempUrl) {

    var acceptedLanguages = config.get('localisation.acceptedLanguages');
    var langue = tempUrl.substr(1, 2);
    if (_.includes(acceptedLanguages, langue)) {
      language = langue;
      setPageJson(tempUrl);
    } else {
      language = config.get('localisation.defaultLanguage');
      setPageJson(language + tempUrl);
    }

  }

  function setPageJson(tempUrl) {
    (tempUrl.substr(tempUrl.length - 1) === "/") ? pageUrl = "/" + tempUrl.substr(3): pageUrl = "/" + tempUrl.substr(3) + "/";
    pageJson = modelPages.searchPage(pageUrl, language);
  }

  function getUrl() {
    return pageUrl;
  }

  function getPageJson() {
    return pageJson;
  }

  that.getLanguage = getLanguage;
  that.setLanguage = setLanguage;
  that.getPageJson = getPageJson;
  that.getUrl = getUrl;
  return that;
}

module.exports = pageDataModel;
