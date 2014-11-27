'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');

var AtwintaGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require('../package.json');

    this.on('end', function () {
      if (!this.options['skip-install']) {
        this.installDependencies();
      }
    });
  },

  askFor: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay('Добро пожаловать в генератор нового проекта Atwinta!'));

    var prompts = [{
      type: 'input',
      name: 'project',
      message: 'Введи название проекта:',
      default: 'Atwinta new project'
    }, {
      type: 'confirm',
      name: 'images',
      message: 'Включить поддержку обработки изображений?',
      default: false
    }, {
      type: 'confirm',
      name: 'test',
      message: 'Включить поддержку тестов?',
      default: false
    }];

    this.prompt(prompts, function (props) {
      this.project = props.project;
      this.projectPackage =
      props.project.replace(/[^\w\s]/gi, '').toLowerCase().split(' ').join('-');
      this.images = props.images;
      this.tests = props.test;
      if (!props.images) {
        this.sprite = false;
        this.base64 = false;
        this.retina = false;
      }

      done();
    }.bind(this));
  },

  askForFeatures: function() {
    if (this.images) {
      var done = this.async();

      var prompts = [{
        type: 'checkbox',
        name: 'features',
        message: 'Выбери дополнительные компоненты:',
        choices: [{
          name: 'Создание спрайтов',
          value: 'sprite',
          checked: false
        }, {
          name: 'Base64 кодирование изображений',
          value: 'base64',
          checked: false
        }, {
          name: 'Retina-ready',
          value: 'retina',
          checked: false
        }]
      }];

      this.prompt(prompts, function (props) {
        function hasFeature(feat) {return props.features.indexOf(feat) !== -1;}

        this.sprite = hasFeature('sprite');
        this.base64 = hasFeature('base64');
        this.retina = hasFeature('retina');

        done();
      }.bind(this));
    }
  },
  
  packageJson: function () {
    var projectName = this.projectPackage;
    /*
    var gruntDeps = {
      'grunt' : 'latest',
      'grunt-notify' : 'latest',
      'grunt-contrib-jshint' : 'latest',
      'grunt-contrib-concat' : 'latest',
      'grunt-contrib-uglify' : 'latest',
      'grunt-contrib-cssmin' : 'latest',
      'grunt-contrib-compass' : 'latest',
      'grunt-contrib-watch' : 'latest',
      'grunt-remove-logging' : 'latest',
      'grunt-jscs-checker' : 'latest',
      'grunt-csscomb' : 'latest',
      'grunt-contrib-connect' : 'latest',
      'grunt-contrib-copy' : 'latest'
    };
    if (this.sprite) {
      gruntDeps['grunt-spritesmith'] = 'latest';
    }
    if (this.base64) {
      gruntDeps['grunt-image-embed'] = 'latest';
    }
    if (this.retina) {
      gruntDeps['grunt-contrib-clean'] = 'latest';
      gruntDeps['grunt-responsive-images'] = 'latest';
    }
    */
    var brocDeps = {
      'broccoli': 'latest',
      'broccoli-compass': 'latest',
      'rimraf': 'latest',
      'broccoli-merge-trees': 'latest',
      'broccoli-concat': 'latest',
      'broccoli-static-compiler': 'latest',
      'broccoli-jshint': 'latest',
      'broccoli-jscs': 'latest'
    };
    if (this.tests) {
      brocDeps['mocha'] = 'latest';
      brocDeps['mocha-phantomjs'] = 'latest';
      brocDeps['chai'] = 'latest';
      brocDeps['sinon'] = 'latest';
      brocDeps['sinon-chai'] = 'latest';
    }
    var pkg = {
      'name': projectName,
      'version': '0.0.1',
      'scripts': {
        'test': './node_modules/mocha-phantomjs/bin/mocha-phantomjs test/test.html'
      },
      'devDependencies': brocDeps
    }
    this.write('package.json', JSON.stringify(pkg));
  },

  sass: function () {
    this.mkdir('sass');
    this.copy('sass/_screen.scss', 'sass/screen.scss');
  },

  stylesheets: function() {
    this.mkdir('stylesheets');
    this.mkdir('css');
  },

  js: function () {
    this.mkdir('js');
    this.copy('js/_app.js', 'js/app.js');
    this.copy('js/_main.js', 'js/main.js');
    this.copy('_.bowerrc', '.bowerrc');
    this.copy('_bower.json', 'bower.json');
    this.copy('_.jscsrc', '.jscsrc');
  },

  images: function () {
    if (this.images) {
      this.mkdir('img');
      if (this.base64) {
        this.mkdir('img/base64');
        this.copy('_base64.css', 'img/base64/base64.css');
      }
      this.mkdir('img/ui');
      if (this.retina) {
        this.mkdir('img/ui/retina');
        this.mkdir('img/ui/normal');
      }
      if (this.sprite) {
        this.mkdir('sprites');
      }
    }
  },

  tests: function() {
    if (this.tests) {
      this.mkdir('test');
      this.copy('test/_test.html', 'test/test.html');
      this.copy('test/_starter.js', 'test/starter.js');
      this.copy('test/_test.js', 'test/test.js');
    }
  },

  app: function () {
    this.copy('_.hgignore', '.hgignore');
    this.copy('_Brocfile.js', 'Brocfile.js');
    this.mkdir('public');
    this.copy('_index.html', 'public/index.html');
  }

});

module.exports = AtwintaGenerator;
