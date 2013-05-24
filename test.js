var assert = require('assert');
var path = require('path');
var tests = [];
var mock1 = []; // 0 error
var mock2 = [{  // 1 error
  file: './my/file.js',
  error: {
      id: '(error)',
      raw: 'Missing semicolon.',
      code: 'W033',
      evidence: '}',
      line: 36,
      character: 2,
      scope: '(main)',
      a: undefined,
      b: undefined,
      c: undefined,
      d: undefined,
      reason: 'Missing semicolon.'
  }
}];
var expected1 = '';
var expected2 = '<?xml version="1.0" encoding="utf-8"?><testsuite name="jshint" tests="1" failures="1" errors="0" ><testcase name="my/file.js"><failure message="1 JSHINT Failure" >1. line 36, char 2: Missing semicolon.</failure></testcase></testsuite>';

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


// test output for 0 errors
tests.push(function() {
  var formatter = require('./reporter.js');
  var results = formatter.reporter(mock1);
  var expected = ['<?xml', '<testcase', '<testsuite'];
  if (!results) throw new Error('You should have some XML!');
  expected.forEach(function(str) {
    if (results.indexOf(str) === -1) {
      throw new Error('Expected to see ' + str);
    }
  })
});

// test output for 1 error
tests.push(function() {
  var oldWrite = process.stdout.write.bind(process.stdout);
  process.stdout.write = function() {};
  var formatter = require('./reporter.js');
  var results = formatter.reporter(mock2);
  var strip = new RegExp('[\t\n]', 'g');
  process.stdout.write = oldWrite;
  if (results.replace(strip, '') !== expected2.replace(strip, '')) {
    throw new Error('Unexpected results');
  }
});

// run all tests
tests.forEach(function(test) {
  test();
});

// seems like we're ok
console.log('all of the tests passed!');