var jasmine = require('jasmine-node');
var zombie = require('zombie');
var browser = new zombie.Browser();

function whenPageHasLoaded(callback) {
  browser.visit('http://localhost:8000/', function(error, browser) {
    callback.call();
  })
  jasmine.asyncSpecWait();
}

describe('home page', function() {

  describe('initial', function() {
    it('has correct title', function() {
      whenPageHasLoaded(function() {
        expect(browser.text('title')).toEqual('Fat client boilerplate');
        jasmine.asyncSpecDone();
      })
    });
  });

});
