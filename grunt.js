module.exports = function (grunt) {
  'use strict';

  grunt.loadNpmTasks('grunt-reload');
  grunt.loadNpmTasks('grunt-requirejs');
  grunt.loadNpmTasks('grunt-hash');
  grunt.loadNpmTasks('grunt-shell');

  // Project configuration.
  grunt.initConfig({
    pkg: '<json:package.json>',
    meta: {
      banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '<%= pkg.homepage ? "* " + pkg.homepage + "\n" : "" %>' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
        ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */'
    },
    lint: {
      grunt: ['grunt.js'],
      src:   ['src/{collections,models,regions,views}/**/*.js', 'src/*.js'],
      test:  ['test/**/.js']
    },
    jshint: {
      options: {indent: 2},
      src: {
        globals: {define: true, require: true}
      },
      test: {
        globals: {describe: true, require: true, it: true}
      }
    },
    requirejs: {
      compile: {
        options: {
          baseUrl: './src',
          out: './build/build.js',
          include: ['require-lib', 'config', 'main'],
          pragmasOnSave: {
            excludeJade : true
          },
          paths: {
            'require-lib': 'vendor/requirejs/require',
            'jquery': 'vendor/jquery/jquery.min',
            'underscore': 'vendor/underscore-amd/underscore-min',
            'backbone': 'vendor/backbone-amd/backbone-min',
            'backbone-validation': 'vendor/backbone-validation/dist/backbone-validation-amd',
            'backbone.wreqr': 'vendor/backbone.wreqr/lib/amd/backbone.wreqr',
            'backbone.babysitter': 'vendor/backbone.babysitter/lib/amd/backbone.babysitter',
            'jade': 'vendor/require-jade/jade',
            'marionette': 'vendor/marionette/lib/core/amd/backbone.marionette',
            'rivets': 'vendor/rivets/lib/rivets.min',
            'text': 'vendor/requirejs-text/text'
          }
        }
      }
    },
    shell: {
      clean_build: {
        command: 'rm build/build.js build/main.min.css'
      },
      clean_dist: {
        command: 'git rm dist/*.{css,js}'
      },
      update_dist: {
        command: 'git add dist/* build/*'
      },
      jasmine: {
        command: 'phantomjs test/support/jasmine-runner.coffee http://localhost:8000/headlessRunner.html',
        stdout: true
      },
      zombie: {
        command: './node_modules/jasmine-node/bin/jasmine-node test/integration',
        stdout: true
      },
      'sass-development': {
        command: 'sass -l -t expanded stylesheets/main.scss:build/main.css',
        stdout: true
      },
      'sass-production': {
        command: 'sass -t compressed stylesheets/main.scss:build/main.min.css',
        stdout: true
      }
    },
    hash: {
      src: ['build/*.js', 'build/main.min.css'],
      mapping: 'dist/assets.json',
      dest: 'dist/'
    },
    watch: {
      grunt: {
        files: ['grunt.js'],
        tasks: 'lint:grunt'
      },
      javascript: {
        files: ['src/*.js', 'src/{collections,models,regions,test,views}/**/*.js'],
        tasks: 'lint:src lint:test reload shell:jasmine shell:zombie'
      },
      stylesheet: {
        files: ['stylesheets/*.scss'],
        tasks: 'shell:sass-development reload'
      }
    },
    server: {
      port: 8000,
      base: '.'
    },
    reload: {
      port: 35729, // LR default
      liveReload: {},
      proxy: {
        port: 8000
      }
    }
  });

  // Default task
  grunt.registerTask('default', 'lint server shell:sass-development reload shell:jasmine shell:zombie watch');
  grunt.registerTask('dist', 'shell:clean_build shell:clean_dist shell:sass-production requirejs hash shell:update_dist');
  grunt.registerTask('test', 'server:development shell:jasmine');
  grunt.registerTask('integration', 'server shell:zombie');

};
