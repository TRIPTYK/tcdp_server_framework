var fs = require('fs');
var _ = require('lodash');

function pagesModel() {
  console.log('pagesModel initialized');
  var that = {};
  var pages;
  var isModelLoaded = false;
  fs.readFile(process.cwd() + "/datas/pages.json", function(err, data) {
    if (err) return console.log(err);
    try {
      pages = JSON.parse(data).pages;
      isModelLoaded = true;
    } catch (e) {
      throw e;
    }
  });

  function searchPage(url,langue) {
    if (isModelLoaded) {
      var searchKey = {};
      searchKey["url_"+langue]=url;
      console.log( _.find(pages, searchKey));
      return _.find(pages, searchKey);
    } else {
      return "THE MODEL WAS NOT LOADED";
    }
  }



  that.searchPage = searchPage;
  return that;
}

module.exports = pagesModel();
