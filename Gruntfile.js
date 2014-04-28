module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      node: ['core/**/*.js', 'core/*.js'],
      beforeconcat: ['src/**/*.js', 'src/*.js'],
      afterconcat: ['public/js/output.min.js']
    },
    uglify: {
      options: {
        mangle: true,
        compress: true
      },
      app: {
        files: {
          'public/js/output.min.js': ['src/**/*.js', 'src/*.js']
        }
      }
    }
  });

  // JSHint task
  grunt.loadNpmTasks('grunt-contrib-jshint');

  // JS Uglify task
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task(s).
  grunt.registerTask('default', ['jshint:node', 'jshint:beforeconcat','uglify', 'jshint:afterconcat',]);

};