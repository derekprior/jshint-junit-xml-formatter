JSHint JUnit Reporter
==========================

A JSHint output report that returns results compatible with JUnit XML. This makes it possible to integrate the results into any reporting framework that accepts that format. I have found this particularly useful in continuous integration scenarios (Bamboo, Jenkins, etc.)

The entire JSHint run is considered a test suite and each file with failures is a test case. A failure node is added to each test case indicating the number of linting errors for that test case. The body of that node enumerates the messages.

```xml
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
option like this:

`jshint --reporter=reporter.js reporter.js`

You can also use this plugin with the [grunt-contrib-jshint](https://github.com/gruntjs/grunt-contrib-jshint) plugin that support 
the `reporter` option using something like this in your `options` object:

```javascript
options: {
	reporter: require("jshint-junit-reporter"),
	reporterOutput: "junit-output.xml"
}
```

**Note**: To use this option you should be on [grunt-contrib-jshint](https://github.com/gruntjs/grunt-contrib-jshint) `>0.5.3`.

Bamboo Integration
------------------

In order to hook this into Bamboo I have a 3 step test-plan:

1. Checkout Code
2. Build Script
3. Read JUnit XML Files

### Build Script

```
grunt jshint
```
-----

I also fill in the `Working Sub-directory` field with the path to my repo, which my case is `grunt`.

![Bamboo Build Script](http://f.cl.ly/items/0f381K2G0B0x0y3H2a3t/Screen%20Shot%202013-05-01%20at%2011.17.16%20AM.png)

### JUnit Parser Configuration

```
grunt/junit-output.xml
```

Again, change this to whatever works for your naming convention. With the newer verison of grunt you can just reference the single file and it should work fine!

![JUnit Parser Configuration](http://f.cl.ly/items/473l1d2g1U1K471B3C1N/Screen%20Shot%202013-05-01%20at%2011.16.45%20AM.png)

### Results

![Bamboo JSHint](http://f.cl.ly/items/3r3m2o2D3U1q0a3p0K0i/Screen%20Shot%202013-05-01%20at%2011.22.31%20AM.png)

Limitations
-----------

The reporter API provided by JSHint provides access only to failure information. Therefore, the resulting XML will only list test cases for files that contained failures.

The number of tests containing linting failures will be reflected in the "tests" attribute of the testsuite element. The total number of failures in those files will be reflected in the "failures" attribute.

In the happy case that there are no failures an empty test case will be created for you.