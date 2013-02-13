/*
 * Extracted from grunt-connect
 * https://github.com/iammerrick/grunt-connect
 *
 */

var connect = require('connect');
var path = require('path');

module.exports = function(grunt) {

  grunt.registerMultiTask('static-server', 'Run a static server for the specified path', function() {

    var runIndefinitely = this.data.runIndefinitely;
    if (runIndefinitely === undefined || runIndefinitely == true) {
      this.async();
    }

    var port = this.data.port || 1337;
    var bases = [];

    if (this.data.base !== undefined) {
      bases.push(path.resolve(this.data.base));
    }

    // add default if nothing is specified
    if (bases.length === 0) {
      bases.push(path.resolve('.'));
    }

    grunt.log.success('Opening server for ' + bases.join(', ') +
      ' on port ' + port + '.');

    var app = connect();

    bases.forEach(function (base) {
      app.use(connect.static(base));
      app.use(connect.directory(base));
    });

    app.listen(port);
  });
};
