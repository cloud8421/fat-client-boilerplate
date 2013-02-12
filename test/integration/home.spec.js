var jasmine = require('jasmine-node');
var zombie = require('zombie');
var browser = new zombie.Browser();

function wait() {
  jasmine.asyncSpecWait();
}

function done() {
  jasmine.asyncSpecDone();
}

function visit(path, callback) {
  browser.visit('http://localhost:8001' + path, function (error, browser) {
    callback.call();
  });
  wait();
}

describe('home page', function () {

  describe('initial', function () {
    it('has correct title', function () {
      visit('/', function () {
        expect(browser.text('title')).toEqual('Fat client boilerplate');
        done();
      });
    });
    it('has the right body', function () {
      visit('/', function () {
        expect(browser.text('h1')).toEqual('It works!');
        done();
      });
    });
  });

});
