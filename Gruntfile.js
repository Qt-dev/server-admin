module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      node: ['lib/**/*.js', 'lib/*.js'],
      beforeconcat: ['src/**/*.js', 'src/*.js'],
      afterconcat: ['lib/public/js/output.min.js']
    },
    uglify: {
      options: {
        mangle: true,
        compress: true
      },
      app: {
        files: {
          'lib/public/js/output.min.js': ['src/**/*.js', 'src/*.js']
        }
      }
    },
    mocha: {
      options: {
        run: true,
        reporter: 'Nyan'
      },
      all: ['test/index.html']
    }
  });

  // JSHint task
  grunt.loadNpmTasks('grunt-contrib-jshint');

  // JS Uglify task
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Mocha task
  grunt.loadNpmTasks('grunt-mocha');

  // Default task(s).
  grunt.registerTask('default', ['jshint:node', 'jshint:beforeconcat', 'mocha','uglify', 'jshint:afterconcat',]);

};