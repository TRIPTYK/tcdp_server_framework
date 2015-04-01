var hbs = require('handlebars');


function helpersModel() {
  var modelPages = require('../models/Pages.js');
  hbs.registerHelper('getHeaderMenuActive', function(idMenuEl, idPage) {
    if (idMenuEl == idPage) {
      return "active";
    }
  });
  hbs.registerHelper('getBreadCrumb', function(id, langue) {
    var breadcrumbs = getBreadCrumbsRec(id,langue).reverse();
    var tmpHtml = '<div class="breadcrumb"><span class="crumb first"><a href="/' + langue + '/">Accueil</a></span>';
    for (var i = 0, l = breadcrumbs.length; i < l; i++) {
      if (i == l - 1) {
        tmpHtml += '<span class="breadcrumbs-arrow">&#8250;</span><span class="crumb last"><a href="' + breadcrumbs[i].url + '" target="_SELF">' + breadcrumbs[i].title + '</a></span>'
      } else {
        tmpHtml += '<span class="breadcrumbs-arrow">&#8250;</span><span><a href="' + breadcrumbs[i].url + '" target="_SELF">' + breadcrumbs[i].title + '</a></span>'
      }
    };
    tmpHtml += "</div>"
    return tmpHtml;
  });

  function getBreadCrumbsRec(id, langue,breads) {
    var arr;
    console.log(breads);
    (breads !== undefined) ? arr = breads: arr = [];
    if (id) {
      var tempPage = modelPages.searchPageById(id);
      console.log(tempPage['breadcrumb_' + langue])
      arr.push({
        title: tempPage['breadcrumb_' + langue],
        url: tempPage['url_' + langue]
      });
      if (tempPage.parent) {
        return getBreadCrumbsRec(tempPage.parent, arr);
      } else {
        return arr;
      }
    }
  }
}

module.exports = helpersModel();
