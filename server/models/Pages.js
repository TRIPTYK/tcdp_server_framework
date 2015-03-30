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

  function searchPage(url_page) {
    if (isModelLoaded) {
      console.log('searchPage');
      console.log( _.find(pages, {"url": url_page}));
      return _.find(pages, {"url": url_page});
    } else {
      return "THE MODEL WAS NOT LOADED";
    }
  }



  that.searchPage = searchPage;
  return that;
}

module.exports = pagesModel();
