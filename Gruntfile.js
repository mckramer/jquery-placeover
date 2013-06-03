module.exports = function (grunt) {
  
  grunt.initConfig({
    // Metadata
    banner: '/*! <%= pkg.name %> (v<%= pkg.version %>) <%= grunt.template.today("dd-mm-yyyy") %> */',
    pkg: grunt.file.readJSON('package.json'),
    
    // Tasks
    clean: {
      dist: ['dist']
    },
    copy: {
      dist: {
        files: {
          'dist/jquery.placeover.css':  ['src/css/*.css'],
          'dist/jquery.placeover.js':   ['src/js/*.js']
        }
      }
    },
    csslint: {
      files: ['src/**/*.css'],
      options: {
        "adjoining-classes": false
      }
    },
    cssmin: {
      options: {
        banner: '<%= banner %>'
      },
      dist: {
        files: {
          'dist/jquery.placeover.min.css': ['dist/jquery.placeover.css']
        }
      }
    },
    jshint: {
      files: ['gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
      options: {
        // Override JSHint defaults
        laxcomma: true,
        globals: {
          jQuery:   true,
          console:  true,
          module:   true,
          document: true
        }
      }
    },
    qunit: {
      all: ['test/index.html']
    },
    uglify: {
      options: {
        banner: '<%= banner %>\n'
      },
      dist: {
        files: {
          'dist/jquery.placeover.min.js': ['dist/jquery.placeover.js']
        }
      }
    },
    watch: {
      files: ['<%= csslint.files %>', '<%= jshint.files %>'],
      tasks: ['csslint', 'jshint', 'qunit']
    }
  });
  
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-csslint');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  
  grunt.registerTask('test', ['csslint', 'jshint', 'qunit']);
  grunt.registerTask('default', ['csslint', 'jshint', 'qunit', 'clean', 'copy', 'cssmin', 'uglify']);
  
};