var fs = require('fs');
var walk = require('walk');
var path = require('path');
var hbs = require('handlebars');
var _ = require('lodash');

function partialsModel() {
  var that = {};
  var partials = [];

  function init(folder, fn) {
    console.log("partial init");
    partials = [];
    var walker = walk.walk(path.join(process.cwd(), folder));
    walker.on("file", function(root, fileStats, next) {
      var tempName = 'partials/'+path.join(root, fileStats.name).replace(path.join(process.cwd(), folder) + '/', '').replace('.hbs', '')
      fs.readFile(path.join(root, fileStats.name), function(err, data) {
        if (err) return console.log(err);
        partials.push({
          name: tempName,
          value: data.toString('utf8')
        });
        next();
      });

    });
    walker.on("end", function() {
      fn();
    })
  }

  function registerPartials() {
    partials.map(function(item) {
      hbs.registerPartial(item.name, item.value);
    });
  }

  function getPartial(id) {
    return _.find(partials, {
      name: id
    })
  }
  that.init = init;
  that.registerPartials = registerPartials;
  that.getPartial = getPartial;
  return that;
}

module.exports = partialsModel();
