var mergeTrees = require('broccoli-merge-trees');
var compileSass = require('broccoli-compass');
var concat = require('broccoli-concat');
var pickFiles = require('broccoli-static-compiler');
var jshintTree = require('broccoli-jshint');
var jscsTree = require('broccoli-jscs');

var path = __dirname;
var html = 'public';
var sass = 'sass';

var jsLinted = jshintTree('js', {breakBuild: true});
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