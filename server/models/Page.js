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

  function setLanguage(tempUrl) {

    var acceptedLanguages = config.get('localisation.acceptedLanguages');
    var langue = tempUrl.substr(1, 2);
    if (_.includes(acceptedLanguages, langue)) {
      language = langue;
      setUrl(tempUrl);
    }else{
      language=config.get('localisation.defaultLanguage');
      setUrl(language+tempUrl);
    }

  }

  function setUrl(tempUrl){
    // console.log(tempUrl.substr(tempUrl.length-1));
    (tempUrl.substr(tempUrl.length-1) ==="/")?pageUrl = tempUrl.substr(3) : pageUrl = tempUrl.substr(3)+"/";

  }

  function getUrl(){
    return pageUrl;
  }


  that.getLanguage = getLanguage;
  that.setLanguage = setLanguage;
  that.getUrl = getUrl;
  that.setUrl = setUrl;
  return that;
}

module.exports = pageDataModel;
