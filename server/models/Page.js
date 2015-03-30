var fs = require('fs');
var _ = require('lodash');
var config = require('config');
function pageDataModel() {
  console.log('pageDataModel initialized');
  var that = {};

  //PRIVATES VARIABLES
  var language;
  var pageUrl;

  function getLanguage() {
    return language;
  }

  function setLanguage(idLanguage) {

    var acceptedLanguages = config.get('localisation.acceptedLanguages');
    var langue = idLanguage.substr(1, 2);
    if (_.includes(acceptedLanguages, langue)) {
      language = langue;
    }else{
      language=config.get('localisation.defaultLanguage');
    }
    return;
  }


  that.getLanguage = getLanguage;
  that.setLanguage = setLanguage;
  return that;
}

module.exports = pageDataModel;
