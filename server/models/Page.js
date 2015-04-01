var fs = require('fs');
var _ = require('lodash');
var modelPages = require('../models/Pages.js');
var config = require('config');

function pageDataModel() {
    var that = {};

    //PRIVATES VARIABLES
    var language;
    var pageUrl;
    var pageData;

    function getLanguage() {
      return language;
    }

    function setLanguage(tempUrl) {

      var acceptedLanguages = config.get('localisation.acceptedLanguages');
      var langue = tempUrl.substr(1, 2);
      if (_.includes(acceptedLanguages, langue)) {
        language = langue;
        setPageData(tempUrl);
      } else {
        language = config.get('localisation.defaultLanguage');
        setPageData(language + tempUrl);
      }

    }


      function setPageData(tempUrl) {
        (tempUrl.substr(tempUrl.length - 1) === "/") ? pageUrl = "/" + tempUrl.substr(3): pageUrl = "/" + tempUrl.substr(3) + "/";
        var pageJson = modelPages.searchPage(pageUrl, language);
        if (pageJson) {
          pageData = {};
          pageData.id = pageJson.id;
          pageData.url = pageJson["url_" + language];
          pageData.title = pageJson["title_" + language];
          pageData.meta_description = '<meta name="Description" content="' + pageJson["meta_description_" + language] + '" />';
          pageData.meta_keywords = '<meta name="Keywords" content="' + pageJson["meta_keywords_" + language] + '">';
          pageData.css = pageJson["css"];
          pageData.js = pageJson["js"];
          (pageJson["header_footer"] == "true") ? pageData.header_footer = true: pageData.header_footer = false;
          pageData.parent = pageJson["parent"];
          pageData.breadcrumb = pageJson["breadcrumb_" + language];
          pageData.controller = pageJson["controller"];
          pageData.method = pageJson["method"];
          pageData.redirect = pageJson["redirect"];
          pageData.exact_match = pageJson["exact_match"];
          pageData.template = pageJson["template"];
        }
      }

      function getUrl() {
        return pageUrl;
      }

      function getPageData() {
        return pageData;
      }

      that.getLanguage = getLanguage;
      that.setLanguage = setLanguage;
      that.getPageData = getPageData;
      that.getUrl = getUrl;
      return that;
    }

    module.exports = pageDataModel;
