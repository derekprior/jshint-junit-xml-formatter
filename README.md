JSHint JUnit Reporter
==========================

A JSHint output report that returns results compatible with JUnit ANT
Task XML. This makes it possible to integrate the results into any
reporting framework that accepts that format. I have found this
particularly useful in continuous integration scenarios.

The entire JSHint run is considered a test suite and each file with
failures is a test case. A failure node is added to each test case
indicating the number of linting errors for that test case. The body
of that node enumerates the messages.

```
<?xml version="1.0" encoding="utf-8"?>
<testsuite name="jshint" tests="1" failures="3" errors="0" >
	<testcase name="test.js">
		<failure message="3 JSHint Failures" >
1. line 3, char 5: Missing &quot;use strict&quot; statement.
2. line 4, char 2: Missing semicolon.
3. line 1, char 1: &apos;x&apos; is not defined.
		</failure>
	</testcase>
</testsuite>
```

Installation
------------

Download the file directly on install using NPM:
`npm install jshint-junit-reporter`

Usage
-----

Pass the path to reporter.js to the JSHint `--reporter`
option.

You can also use this plugin with newer versions of the grunt-contrib-jshint plugin that support 
the `report` option using something like this in your `options` object:

    options: {
        reporter: require('jshint-junit-reporter'),
        reporterOutput: "junit-output.xml"
    }

Limitations
-----------

The reporter API provided by JSHint provides access only to failure
information. Therefore, the resulting XML will only list test cases for
files that contained failures.

The number of tests containing linting faiures will be reflected in the
"tests" attribute of the testsuite element. The total number of failures
in those files will be reflected in the "failures" attribute.

