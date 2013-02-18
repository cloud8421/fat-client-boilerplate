var path = require('path');
var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;

var folderMount = function folderMount(connect, point) {
  return connect.static(path.resolve(point));
};

module.exports = function (grunt) {
  'use strict';

  grunt.loadNpmTasks('grunt-contrib-livereload');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-hash');
  grunt.loadNpmTasks('grunt-regarde');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadTasks('tasks');

  // Project configuration.
  grunt.initConfig({
    'finalize-html': {
      dist: {
        src: 'index.html',
        dest: 'dist/index.html',
        manifest: 'dist/assets.json'
      }
    },
    jshint: {
      grunt: ['Gruntfile.js'],
      src:   ['src/**/*.js', '!src/vendor/**/*.js'],
      test:  ['test/**/*.js'],
      options: {
        indent: 2,
        es5: true,
        globals: {
          describe: true,
          define: true,
          require: true,
          it: true,
          jasmine: true,
          reporter: true
        }
      }
    },
    requirejs: {
      compile: {
        options: {
          baseUrl: './src',
          out: './build/build.js',
          include: ['vendor/requirejs/require', 'main'],
          optimize: 'none',
          pragmasOnSave: {
            excludeJade : true
          },
          mainConfigFile: 'src/config.js'
        }
      }
    },
    sass: {
      development: {
        files: {
          "build/main.css": "stylesheets/main.scss"
        },
        options: {
          style: "expanded",
          lineNumbers: true
        }
      },
      production: {
        files: {
          "build/main.min.css": "stylesheets/main.scss"
        },
        options: {
          style: "compressed"
        }
      }
    },
    shell: {
      'clean-build': {
        command: 'rm build/build.js build/main.min.css'
      },
      'clean-dist': {
        command: 'git rm dist/*.{css,js}'
      },
      update_dist: {
        command: 'git add dist/* build/*'
      },
      jasmine: {
        command: 'phantomjs test/support/jasmine-runner.coffee http://localhost:8001/headlessRunner.html',
        options: {
          stdout: true
        }
      },
      zombie: {
        command: 'jasmine-node test/integration',
        options: {
          stdout: true
        }
      }
    },
    hash: {
      src: ['build/*.js', 'build/main.min.css'],
      mapping: 'dist/assets.json',
      dest: 'dist/'
    },
    regarde: {
      grunt: {
        files: ['Gruntfile.js'],
        tasks: ['jshint:grunt'],
        spawn: true
      },
      src: {
        files: ['src/*.js',
                'src/**/*.js',
                '!src/vendor/**/*.js'
        ],
        tasks: ['jshint:src', 'jshint:test', 'livereload', 'shell:jasmine', 'shell:zombie']
      },
      test: {
        files: ['test/**/*.js'],
        tasks: ['jshint:test', 'shell:jasmine', 'shell:zombie'],
        spawn: true
      },
      stylesheet: {
        files: ['stylesheets/*.scss'],
        tasks: ['shell:sass-development', 'livereload']
      }
    },
    connect: {
      livereload: {
        options: {
          port: 35729,
          middleware: function (connect, options) {
            return [lrSnippet, folderMount(connect, '.')];
          }
        }
      },
      development: {
        options: {
          port: 8000,
          base: '.'
        }
      },
      test: {
        options: {
          port: 8001,
          base: '.'
        }
      },
      production: {
        options: {
          port: 8002,
          base: './dist',
          keepalive: true
        }
      }
    }
  });

  // Default task
  grunt.registerTask('test', ['connect:test', 'shell:jasmine', 'shell:zombie']);
  grunt.registerTask('dist', ['shell:clean-build', 'shell:clean-dist', 'sass:production', 'requirejs', 'hash', 'shell:update_dist', 'finalize-html']);
  grunt.registerTask('default', ['jshint', 'livereload-start', 'connect:development', 'sass:development', 'test', 'regarde']);

};
