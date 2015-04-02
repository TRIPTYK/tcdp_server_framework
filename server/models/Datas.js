var fs = require('fs');
var walk = require('walk');
var path = require('path');
var _ = require('lodash');

function datasModel() {
  var that = {};
  var models = [];

  function init(folder, fn) {
    // console.log('call');
    models = [];
    var walker = walk.walk(path.join(process.cwd(), folder));
    walker.on("file", function(root, fileStats, next) {
      // console.log(root,fileStats)
      var tempName = path.join(root, fileStats.name).replace(path.join(process.cwd(), folder) + '/', '').replace('.json', '')
      fs.readFile(path.join(root, fileStats.name), function(err, data) {
        if (err) return console.log(err);
        models.push({
          name: tempName,
          value: JSON.parse(data.toString('utf8'))
        });
        next();
      });

    });
    walker.on("end", function() {
      console.log(models.length)
      fn();
    })
  }

  function getModel(id) {
    return _.find(models, {
      name: id
    })
  }

  that.init = init;
  return that;
}

module.exports = datasModel();
