jshint-junit-xml-formatter
==========================

A JSHint output formatter that returns results compatible with JUnit ANT
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

Usage
-----

Pass the path to jshint-junit-xml-formatter.js to the JSHint `--reporter`
option.

Limitations
-----------

The reporter API provided by JSHint provides access only to failure
information. Therefore, the resulting XML will only list test cases for
files that contained failures.

The number of tests containing linting faiures will be reflected in the
"tests" attribute of the testsuite element. The total number of failures
in those files will be reflected in the "failures" attribute.

