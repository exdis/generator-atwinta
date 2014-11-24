var mergeTrees = require('broccoli-merge-trees');
var compileSass = require('broccoli-compass');
var concat = require('broccoli-concat');
var pickFiles = require('broccoli-static-compiler');

var path = __dirname;
var html = 'public';
var sass = 'sass';

var js = pickFiles('js', {
  srcDir: '.',
  files: ['**/*.js', '!**/*.min.js', '!lib/**/*.js'],
  destDir: '/js'
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
console.log(css);

module.exports = mergeTrees([compassTree, html, css, js]);