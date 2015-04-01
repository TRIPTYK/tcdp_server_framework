var hbs = require('handlebars');


function helpersModel() {

  hbs.registerHelper('isBtnActive', function(idMenuEl, idPage) {
    console.log(idMenuEl,idPage)
    if(idMenuEl ==idPage){
    return "active";
  }
  });
}

module.exports = helpersModel();
