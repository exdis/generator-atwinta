require.config({
  baseUrl: '../',
  paths: {
    'app': 'js/app',
    'jquery': 'js/lib/jquery/dist/jquery.min',
    'mocha': 'node_modules/mocha/mocha',
    'sinon': 'node_modules/sinon/pkg/sinon',
    'sinon-chai': 'node_modules/sinon-chai/lib/sinon-chai',
    'chai': 'node_modules/chai/chai'
  },
  urlArgs: 'bust=' + (new Date()).getTime()
});

// Libraries and starter
require(['require', 'chai', 'sinon', 'sinon-chai', 'mocha'],
function (require, chai, sinon, sinonChai) {
  expect = chai.expect;
  mocha.setup('bdd');

  require(['test/test'], function(require) {
    // Start runner
    if (window.mochaPhantomJS) {
      mochaPhantomJS.run();
    } else {
      mocha.run();
    }
  });

});
