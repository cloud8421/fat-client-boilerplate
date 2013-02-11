require(['../test/main.test'], function () {
  'use strict';
  var jasmineEnv = jasmine.getEnv();
  jasmineEnv.updateInterval = 1000;
  jasmineEnv.addReporter(reporter);
  jasmineEnv.execute();
});
