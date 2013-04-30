var assert = require('assert');
var path = require('path');
var tests = [];

// sanity check the path name provided
tests.push(function() {
  var reporter = path.resolve('./reporter.js');
  assert.equal(reporter, require('./index'));
  assert.ok(require(reporter));
});

// make sure no errors get thrown, yep, ghetto test #2
tests.push(function() {
  var formatter = require('./reporter.js');
});

// run all tests
tests.forEach(function(test) {
  test();
});
