/*jshint node:true */

"use strict";

var suite = 'jshint';

function encode(s) {
  var pairs = {
    "&": "&amp;",
    '"': "&quot;",
    "'": "&apos;",
    "<": "&lt;",
    ">": "&gt;"
  };
  for (var r in pairs) {
    if (typeof(s) !== "undefined") {
      s = s.replace(new RegExp(r, "g"), pairs[r]);
    }
  }
  return s || "";
}

function failure_message(failures) {
  var count = failures.length;
  if (count === 1) {
    return "1 JSHINT Failure";
  } else {
    return count + " JSHint Failures";
  }
}

function failure_details(failures) {
  var msg = [];
  var item;
  for (var i = 0; i < failures.length; i++) {
    item = failures[i];
    msg.push(i+1 + ". line " + item.line + ", char " + item.character + ": " + encode(item.reason));
  }
  return msg.join("\n");
}

exports.reporter = function (results) {

  var out = [];
  var files = {};

  results.forEach(function (result) {
    result.file = result.file.replace(/^\.\//, '');
    if (!files[result.file]) {
      files[result.file] = [];
    }
    files[result.file].push(result.error);
  });

  out.push("<?xml version=\"1.0\" encoding=\"utf-8\"?>");
  out.push("<testsuite name=\"" + suite + "\" tests=\"" + (Object.keys(files).length === 0 ? 1 : Object.keys(files).length) + "\" failures=\"" + results.length + "\" errors=\"0\">");

  // we need at least 1 empty test
  if (!results.length) {
    out.push("\t<testcase name=\"" + suite + "\" />");
  }

  for (var file in files) {
    out.push("\t<testcase name=\"" + file + "\">");
    out.push("\t\t<failure message=\"" + failure_message(files[file]) + "\">");
    out.push(failure_details(files[file]));
    out.push("\t\t</failure>");
    out.push("\t</testcase>");
  }

  out.push("</testsuite>");
  out = out.join("\n") + "\n";

  process.stdout.write(out);
  return out;

};