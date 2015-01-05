module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      options: {
        ignores: ['src/js/views/compiled-react.js', 'lib/public/**/*.min.js']
      },
      node: ['lib/**/*.js', 'lib/*.js'],
      beforeconcat: ['src/**/*.js', 'src/*.js'],
      afterconcat: ['lib/public/js/output.min.js']
    },

    concurrent: {
      dev: {
        tasks: ['nodemon', 'watch'],
        options: {
          logConcurrentOutput: true
        }
      }
    },

    uglify: {
      options: {
        mangle: true,
        compress: true
      },
      app: {
        files: {
          'lib/public/js/output.min.js': [
            'src/js/models/*.js',
            'src/js/collections/*.js',
            'src/js/views/*.js',
            'src/js/controllers/*.js',
            'src/js/*.js']
        }
      }
    },
    react: {
      combined_file_output: {
        files: {
          'src/js/views/compiled-react.js': [
            'src/jsx/boxes/*.jsx',
            'src/jsx/*.jsx'
          ]
        }
      }
    },

    watch: {
      jsx: {
        files: ['src/jsx/**/*.jsx', 'src/jsx/*.jsx'],
        tasks: ['react', 'uglify'],
      },
      frontendJS: {
        files: ['src/js/*.js','src/js/**/*.js'],
        tasks: ['jshint:beforeconcat', 'uglify']
      },
      configFiles: {
        files: [ 'Gruntfile.js'],
        options: {
          reload: true
        }
      }
    },

    nodemon: {
      dev: {
        script: 'app.js'
      }
    }
  });

  // JSHint task
  grunt.loadNpmTasks('grunt-contrib-jshint');

  // JS Uglify task
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Watch task
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Concurrent
  grunt.loadNpmTasks('grunt-concurrent');

  // React task
  grunt.loadNpmTasks('grunt-react');

  // Nodemon task
  grunt.loadNpmTasks('grunt-nodemon');

  // Default task(s).
  grunt.registerTask('default', ['jshint:node', 'jshint:beforeconcat', 'react', 'uglify', 'concurrent']);

};