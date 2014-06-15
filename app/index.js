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
    },{
      type: 'confirm',
      name: 'images',
      message: 'Включить поддержку обработки изображений?',
      default: false
    }];

    this.prompt(prompts, function (props) {
        this.project = props.project;
        this.projectPackage = props.project.replace(/[^\w\s]/gi, '').toLowerCase().split(' ').join('-');
        this.images = props.images;

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
            },{
                name: 'Base64 кодирование изображений',
                value: 'base64',
                checked: false
            },{
                name: 'Retina-ready',
                value: 'retina',
                checked: false
            }]
        }];

        this.prompt(prompts, function (props) {
            function hasFeature(feat) { return props.features.indexOf(feat) !== -1; }

            this.sprite = hasFeature('sprite');
            this.base64 = hasFeature('base64');
            this.retina = hasFeature('retina');

            done();
        }.bind(this));
    }
  },

  sass: function () {
    this.mkdir('sass');
    this.copy('sass/_screen.scss','sass/screen.scss');
    this.copy('_config.rb','config.rb');
  },

  stylesheets: function() {
    this.mkdir('stylesheets');
    this.mkdir('css');
  },

  js: function () {
    this.mkdir('js');
    this.copy('js/_app.js','js/app.js');
    this.copy('js/_main.js','js/main.js');
    this.copy('_.bowerrc','.bowerrc');
    this.copy('_bower.json','bower.json');
    this.copy('_.jscsrc','.jscsrc');
  },

  app: function () {
    this.copy('_.hgignore','.hgignore');
    this.copy('_package.json','package.json');
    this.copy('_index.html','index.html');
  }
});

module.exports = AtwintaGenerator;
