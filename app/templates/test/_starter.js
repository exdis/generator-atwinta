require.config({
  paths: {
    'app': '../js/app',
    'jquery': '../vendors/jquery/dist/jquery.min',
    'mocha': '../node_modules/mocha/mocha',
    'chai': '../node_modules/chai/chai'
  },
  urlArgs: 'bust=' + (new Date()).getTime()
});

// Libraries and starter
require(['require', 'chai', 'mocha'],
function (require, chai) {
  expect = chai.expect;
  mocha.setup('bdd');

  require(['test'], function(require) {
    // Start runner
    if (window.mochaPhantomJS) {
      mochaPhantomJS.run();
    } else {
      mocha.run();
    }
  });

});
