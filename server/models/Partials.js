var fs = require('fs');


function partialsModel() {
  console.log('partialsModel initialized');
  var that = {};
  var partials;

  function init(folder, fn) {
    fs.readdir(process.cwd() + folder, function(err, data) {
      if (err) return console.log(err);
      try {
        console.log(data)


      } catch (e) {
        throw e;
      }
    });
  }





function getPartials(){
  return partials;
}

  that.init = init;
  that.getPartials = getPartials;
  return that;
}

module.exports = partialsModel();
