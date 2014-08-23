require.config({
  baseUrl: '../js/',
  paths: {
    'jquery': 'lib/jquery/dist/jquery.min'
  },
  nodeRequire: require
});

require(['app']);

describe('DOM tests', function() {
  var p = document.querySelector('p');
  it('P exists in the DOM', function() {
    expect(p).to.not.equal(null);
  });
  it('P has content "Hello world"', function() {
    expect(p.innerHTML).to.equal('Hello world');
  });
});

if (window.mochaPhantomJS) {
  mochaPhantomJS.run();
} else {
  mocha.run();
}
