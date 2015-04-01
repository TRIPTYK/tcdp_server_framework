var fs = require('fs');
var _ = require('lodash');
var path = require('path');
function pagesModel() {
  console.log('pagesModel initialized');
  var that = {};
  var pages;

  function init(file, fn) {
    fs.readFile(path.join(process.cwd() , file), function(err, data) {
      if (err) return console.log(err);
      try {
        pages = JSON.parse(data).pages;
        fn(null);
      } catch (e) {
        throw (e);
      }
    });
  }

  function searchPage(url, langue) {
    var searchKey = {};
    searchKey["url_" + langue] = url;
    var result = _.find(pages, searchKey);
    return result;
  }
  function searchPageById(id) {
    var searchKey = {};
    searchKey["id"] = id;
    var result = _.find(pages, searchKey);
    return result;
  }


  that.init = init;
  that.searchPage = searchPage;
  that.searchPageById = searchPageById;
  return that;
}

module.exports = pagesModel();
