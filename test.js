
// test.js - Test index.js
// NOTE: must be run usingmocha (http://visionmedia.github.com/mocha/)
(function() {

  // check for mocha context
  if (!describe || !it) {
    console.log("This file is intended to be run using mocha:");
    console.log("    http://visionmedia.github.com/mocha/");
    return;
  }


  var index = require('./index')
    , assert = require('assert');

  describe('index.js', function() {
    describe('exports', function() {
      it('a middleware function', function() {
        assert(typeof index === 'function');
        assert(index.length === 3);
      });
    });
  });

  describe('middleware function', function() {
    it('should generates an id', function(done) {
      var obj = { };

      index(obj, null, function(e) {
        if (!!e) return done(e);

        assert('id' in obj);
        assert(typeof obj['id'] === 'string');
        done();
      });
    });
  });

})();

