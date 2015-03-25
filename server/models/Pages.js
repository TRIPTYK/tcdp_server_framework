function PagesModel() {
  var that = {};
  var pages;

  function init() {
    fs.readFile(__dirname + "/pages.json", function(err, data) {
      if (err) return console.log(err);
      pages = JSON.parse(data).pages;
    });

    function searchPage(id, model) {
      return _.find(model, {
        "idName": id
      });
    }

    that.searchPage = searchPage;

    return that;
  }
}
module.exports = PagesModel;
