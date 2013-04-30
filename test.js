var assert = require('assert');
var path = require('path');

// sanity check the path name provided
assert.equal(path.resolve('./reporter.js'), require('./index'));

// make sure no errors get thrown, yep, ghetto test #2
var formatter = require('./reporter.js');