//Simple test
define([
  'app',
  'jquery'
], function(require, $) {
  var p;
  describe('DOM tests', function() {
    before(function(done) {
      $(document).ready(function() {
        p = document.querySelector('p');
        done();
      });
    });
    it('true === true', function() {
      expect(true).to.be.true;
    });
    it('P exists in the DOM', function() {
      expect(p).to.not.equal(null);
    });
    it('P has content "Hello world"', function() {
      expect(p.innerHTML).to.equal('Hello world');
    });
  });
});
