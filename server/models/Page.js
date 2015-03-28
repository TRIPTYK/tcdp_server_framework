var fs = require('fs');
var _ = require('lodash');

function pageDataModel() {
  console.log('pageDataModel initialized');
  var that = {};

  //PRIVATES VARIABLES
  var language;




  function getLanguage() {
    return language;
  }

  function setLanguage(idLanguage) {

    var acceptedLanguages = ["fr", "nl", "en", "de"];
    var langue = idLanguage.substr(1, 2);
    console.log(_.includes(acceptedLanguages,langue));
    if (acceptedLanguages.map(function(item) {
        if (item === langue) return true;
      })) {
      language = langue;
    }else{
      language="fr";
    }
    return true;
  }


  that.getLanguage = getLanguage;
  that.setLanguage = setLanguage;
  return that;
}

module.exports = pageDataModel;
