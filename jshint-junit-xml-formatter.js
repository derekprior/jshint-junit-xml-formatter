/*jshint node:true */

/* Adapted from the default JSHint xml formatter by Derek Prior
 *  http://prioritized.net
 *
 * Source, documentation, and license available at:
 *   https://github.com/derekprior/jshint-junit-xml-formatter
 */
module.exports =
{
  reporter: function (results)
  {
    "use strict";

    var suite = 'jshint';
    var files = {};
    var out = [];
    var pairs = {
      "&": "&amp;",
      '"': "&quot;",
      "'": "&apos;",
      "<": "&lt;",
      ">": "&gt;"
    };

    var file, i, issue;

    function encode(s) {
      for (var r in pairs) {
        if (typeof(s) !== "undefined") {
          s = s.replace(new RegExp(r, "g"), pairs[r]);
        }
      }
      return s || "";
    }

    function failure_message(issue) {
      return "line " + issue.line + ", char " + issue.character + ": " + encode(issue.reason);
    }

    results.forEach(function (result) {
      result.file = result.file.replace(/^\.\//, '');
      if (!files[result.file]) {
        files[result.file] = [];
      }
      files[result.file].push(result.error);
    });

    out.push("<?xml version=\"1.0\" encoding=\"utf-8\"?>");
    out.push("<testsuite name=\"" + suite + "\" tests=\"" + Object.keys(files).length + "\" failures=\"" + results.length + "\" errors=\"0\" >");

    for (file in files) {
      out.push("\t<testcase name=\"" + file + "\">");
      for (i = 0; i < files[file].length; i++) {
        issue = files[file][i];
        out.push("\t\t<failure message=\"" + failure_message(issue) + "\" />");
      }
      out.push("\t</testcase>");
    }

    out.push("</testsuite>");
    process.stdout.write(out.join("\n") + "\n");
  }
};
