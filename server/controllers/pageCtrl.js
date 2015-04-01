var express = require('express');
var fs = require('fs');
var async = require('async');
var config = require('config');
var path = require('path');
var compressor = require('node-minify');
var router = express.Router();
var hbs = require('handlebars');
var modelPages = require('../models/Pages.js');
var modelPartials = require('../models/Partials.js');
var dataPage;



    router.use(function(req, res, next) {
      async.parallel({
          modelPages: function(callback) {
            modelPages.init(config.get('modelFiles.pages'), function(err, data) {
              callback(null, data);
            });
          },
          modelPartials: function(callback) {
            modelPartials.init("/public/static/partials", function(err, data) {
              callback(null, data);
            });
          }
        },
        function(err, results) {
          require('../models/Helpers.js');
          dataPage = require('../models/Page.js')();
          dataPage.setLanguage(req.path);
          next();
        });

    });


    router.use(function(req, res, next) {
      if (dataPage.getPageData()) {
        next();
      } else {
        res.status(404).send("<h1>The page " + dataPage.getUrl() + " doesn't exist</h1>");
      }
    })
    router.use(function(req, res, next) {
          var pageData = dataPage.getPageData();
          var templateToRender = path.join(process.cwd(),'public/static', pageData.template + "-" + dataPage.getLanguage() + ".hbs");
          fs.readFile(templateToRender, function(err, data) {
            if (err) throw err;
            //GET TEMPLATE
            var body = data.toString("utf8");
            //REGISTER BODY PARTIAL
            hbs.registerPartial('body', body);
            //REGISTER PARTIALS
            modelPartials.registerPartials();
            //CHECK FOR HEADER-FOOTER
            if (!pageData.header_footer) {
              hbs.registerPartial('contentHeader', '');
              hbs.registerPartial('contentFooter', '');
            }




            async.parallel({
              css: function(callback) {
                //BUNDLE CSS
                var css = pageData.css.map(function(item) {
                  return path.join(process.cwd(), 'public/static/css', item);
                });
                try {
                  new compressor.minify({
                      type: 'clean-css',
                      fileIn: css,
                      fileOut: path.join(process.cwd(), 'public/styles/' + pageData.id + '.min.css'),
                      options: [],
                      callback: function(err, min) {
                        if (err) console.log(err);
                        var tempPartial = '<link href="/styles/' +pageData.id + '.min.css'+ '" rel="stylesheet"/>';
                        callback(null, tempPartial);
                        }
                      });
                  } catch (e) {
                    console.log(e)
                  }
                },
                js: function(callback) {
                  //BUNDLE JS
                    var js = pageData.js.map(function(item) {
                      return path.join(process.cwd(), 'public/static/js', item);
                    });
                    //TODO: ADD SOURCEMAP
                    try {
                      new compressor.minify({
                          type: 'uglifyjs',
                          fileIn: js,
                          fileOut: path.join(process.cwd(), 'public/scripts/' + pageData.id + '.min.js'),
                          options: [],
                          callback: function(err, min) {
                            var tempPartial = '<script src="/scripts/'+  pageData.id + '.min.js' + '"></script>';
                            callback(null, tempPartial);
                            }
                          });
                      } catch (e) {
                        console.log(e);
                      }

                    }
                  },
                  function(err, results) {
                    //ADD CSS AND JS
                    pageData.StylesCSS = results.css;
                    pageData.ScriptsJS = results.js;



                    //COMPILE HANDLEBARS
                    var template = hbs.compile(modelPartials.getPartial('partials/system/header').value)
                    res.send(template(pageData))
                  });
            })
          });



        module.exports = router
