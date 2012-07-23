jshint-junit-xml-formatter
==========================

A JSHint output formatter that returns results compatible with JUnit ANT
Task XML. This makes it possible to integrate the results into any
reporting framework that excepts that format. I have found this
particularly useful in continuous integration scenarios.

The entire JSHint run is considered a test suite and each file with
failures is a test case. Linting failures in each file will be enumarated
as failures under the applicable test case. For example:

```
<?xml version="1.0" encoding="utf-8"?>
<testsuite name="jshint" tests="1" failures="3" errors="0" >
	<testcase name="src/test.js">
		<failure message="line 2, char 5: Missing &quot;use strict&quot; statement." />
		<failure message="line 2, char 17: Missing semicolon." />
		<failure message="line 3, char 2: Missing semicolon." />
	</testcase>
</testsuite>
```

== Usage ==

Pass the path to jshint-junit-xml-formatter.js to the JSHint `--reporter`
option.

== Limitations ==

The reporter API provided by JSHint provides access only to failure
information. Therefore, the resulting XML will only list test cases for
files that contained failures.

The number of tests containing linting faiures will be reflected in the
"tests" attribute of the testsuite element. The total number of failures
in those files will be reflected in the "failures" element.

