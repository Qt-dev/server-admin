module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      options: {
        ignores: ['src/compiled.js', 'lib/public/**/*.min.js']
      },
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
    react: {
      combined_file_output: {
        files: {
          'src/compiled.js': [
            'src/jsx/**/*.jsx'
          ]
        }
      }
    }
  });

  // JSHint task
  grunt.loadNpmTasks('grunt-contrib-jshint');

  // JS Uglify task
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // React task
  grunt.loadNpmTasks('grunt-react');

  // Default task(s).
  grunt.registerTask('default', ['jshint:node', 'jshint:beforeconcat', 'react', 'uglify']);

};