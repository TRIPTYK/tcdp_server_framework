var path = require('path');

module.exports = function(grunt) {
  var timer = require('grunt-timer');
  timer.init(grunt);
  grunt.initConfig({
    // # files that our tasks will use
    files: {
      build: "distribution/static/css/"
    },
    //task configuration
    sass: {
      options: {
        sourceMap: false,
        outputStyle: 'expanded',//'compressed',
        includePaths: ['bower_components/compass-mixins/lib/', 'bower_components/susy/sass/', 'server/public/static/sass']
      },
      dist: {
        files: [{
          expand: true, // Enable dynamic expansion.
          cwd: 'server/public/static/sass/', // Src matches are relative to this path.
          src: ['**/*.scss'], // Actual pattern(s) to match.
          dest: 'server/public/static/css', // Destination path prefix.
          ext: '.css', // Dest filepaths will have this extension.
          extDot: 'first' // Extensions in filenames begin after the first dot
        }, ],
      }
    },
    execute: {
        server: {
          options: {
                // pass arguments to node itself (eg: before script parameter)
                cwd: 'server'
            },
            src: ['server/app.js']
        }
    },
    watch: {
      options: {
        livereload: true
      },
      compass: {
        files: ["server/public/static/sass/**/*.scss"],
        tasks: ["sass:dist"]
      },
      grunt: {
        files: ["Gruntfile.js"]
      },
    },
    concurrent: {
      dev: {
          tasks: ['execute', 'watch'],
          options: {
              logConcurrentOutput: true
          }
      }
    }
  });
  // # Loads all plugins that match "grunt-", in this case all of our current plugins
  require('matchdep').filterAll('grunt-*').forEach(grunt.loadNpmTasks);
  grunt.registerTask("default", ["sass:dist","concurrent:dev"]);
}
