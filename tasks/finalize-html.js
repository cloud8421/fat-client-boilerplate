var fs   = require('fs'),
    path = require('path'),
    grunt = require('grunt');

function checkForConfigParam(obj, attr) {
  if (!obj.data[attr]) {
    grunt.fail.warn(new Error('No ' + attr + ' specified for ' + obj.target + ' target'));
  }
}

module.exports = function(grunt) {

  grunt.registerMultiTask('finalize-html', 'Print out "Replace references to assets with md5 hashed ones in html"', function() {

    // check that we have a proper configuration
    if (!this.target) {
      grunt.fail.warn(new Error('No target specified'));
    }
    checkForConfigParam(this, 'src');
    checkForConfigParam(this, 'dest');
    checkForConfigParam(this, 'manifest');

    var parsedManifest = require(path.resolve(this.data.manifest));
    var srcFileContent = fs.readFileSync(this.data.src).toString();
    var buildBlockPattern = /<!-- *beginFinalize *-->([\s\S]*)<!-- *endFinalize *-->/;

    if (!srcFileContent.match(buildBlockPattern)) {
      grunt.fail.warn(new Error('Could not find build block in src file'));
    }

    // parse the manifest and return the right html tag depending on the file extension
    var result = Object.keys(parsedManifest).map(function (key) {
      if (key.match(/\.js$/)) {
        return '<script src="' + parsedManifest[key] + '"></script>';
      } else {
        return '<link rel="stylesheet" type="text/css" href="' + parsedManifest[key] + '">';
      }
    });

    //naive concat with pseudo indentation
    result = result.join('\n  ');

    distFileContent = srcFileContent.replace(buildBlockPattern, result);

    fs.writeFileSync(this.data.dest, distFileContent);
    grunt.log.success('Created the ' + this.data.dest + ' file');
  });

};
