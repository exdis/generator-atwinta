var mergeTrees = require('broccoli-merge-trees');
var compileSass = require('broccoli-compass');
var concat = require('broccoli-concat');
var pickFiles = require('broccoli-static-compiler');
var jshintTree = require('broccoli-jshint');
var jscsTree = require('broccoli-jscs');


var path = __dirname;
var html = 'public';
var sass = 'sass';

<% if (tests) { %>

var fs = require('fs');
jshintTree.prototype.testGenerator = function(relativePath, passed, errors) {
  if (errors) {
    errors = "\\n" + this.escapeErrorString(errors);
  } else {
    errors = ""
  }

  test = 'define(function() {' +
           'describe("JSHint", function() {' +
             'it("JS should pass JSHint", function() {' +
               'expect("' + errors + '").to.be.empty;' +
             '});' +
           '});' +
         '});';
  fs.writeFile('test/jshint.js', test); 
}

jscsTree.prototype.testGenerator = function(relativePath, errors) {
  if (errors) {
    errors = this.escapeErrorString('\n' + errors);
  } else {
    errors = ""
  }

  test = 'define(function() {' +
           'describe("JSCS", function() {' +
             'it("JS should pass JSCS", function() {' +
               'expect("' + errors + '").to.be.empty;' +
             '});' +
           '});' +
         '});';
  fs.writeFile('test/jscs.js', test); 
}
<% } else { %>

jshintTree.prototype.testGenerator = function(relativePath, passed, errors) {
  if (errors) {
    throw {
      message: 'JSHint error',
      file: passed,
      stack: errors
    }
  }
};

jscsTree.prototype.testGenerator = function(relativePath, errors) {
  if (errors) {
    throw {
      message: 'JS CodeStyle error',
      stack: errors
    }
  }
};

<% } %>

var jsLinted = jshintTree('js');
var jsStyled = jscsTree('js');

var js = pickFiles('js', {
  srcDir: '.',
  destDir: '/js'
});

var vendors = pickFiles('vendors', {
  srcDir: '.',
  destDir: '/js/lib'
});

var compassTree = compileSass(sass, {
  outputStyle: 'expanded',
  appDir: path,
  sassDir: 'sass',
  imagesDir: 'img',
  fontsDir: 'fonts',
  cssDir: 'stylesheets'
});

var css = concat('stylesheets', {
  inputFiles: [
    '*.css'
  ],
  outputFile: '/css/style.css'
});

module.exports = mergeTrees([compassTree, html, css, js, jsLinted, jsStyled, vendors]);
