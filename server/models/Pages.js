var fs = require('fs');
var _ = require('lodash');

function pagesModel() {
  console.log('pagesModel initialized');
  var that = {};
  var pages;

  function init(file, fn) {
    fs.readFile(process.cwd() + file, function(err, data) {
      if (err) return console.log(err);
      try {
        pages = JSON.parse(data).pages;
        fn(null);
      } catch (e) {
        throw e;
      }
    });
  }

  function searchPage(url, langue) {
    var searchKey = {};
    searchKey["url_" + langue] = url;
    return _.find(pages, searchKey);
  }


  that.init = init;
  that.searchPage = searchPage;
  return that;
}

module.exports = pagesModel();
