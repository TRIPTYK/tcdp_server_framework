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
        outputStyle: 'compressed',
        includePaths: ['bower_components/compass-mixins/lib/', 'bower_components/susy/sass/', 'server/static/sass']
      },
      dist: {
        files: [{
          expand: true, // Enable dynamic expansion.
          cwd: 'server/static/sass/', // Src matches are relative to this path.
          src: ['**/*.scss'], // Actual pattern(s) to match.
          dest: 'server/static/css', // Destination path prefix.
          ext: '.css', // Dest filepaths will have this extension.
          extDot: 'first' // Extensions in filenames begin after the first dot
        }, ],
      }
    },

    watch: {
      options: {
        livereload: true
      },
      compass: {
        files: ["<%= files.sass.src %>/**/*.scss"],
        tasks: ["sass:dist"]
      },
      grunt: {
        files: ["Gruntfile.js"]
      }
    }
  });
  // # Loads all plugins that match "grunt-", in this case all of our current plugins
  grunt.loadTasks("tasks");
  require('matchdep').filterAll('grunt-*').forEach(grunt.loadNpmTasks);
  grunt.registerTask("default", ["sass:dist"]);
}