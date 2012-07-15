
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

  // general tests
  describe('index.js', function() {
    describe('exports', function() {
      it('a middleware function', function() {
        assert(typeof index === 'function');
        assert(index.length === 3);
      });

      it('and a configuration object', function() {
        assert('config' in index);
        assert(typeof index.config === 'object');
      });
    });
  });

  // config object
  describe('config object', function() {
    var config = index.config;

    describe('should exports', function() {
      it('a newId(callback) function', function() {
        assert('newId' in config);
        assert(typeof config['newId'] === 'function');
        assert(config['newId'].length === 1);
      });

      it('a bytesCount number', function() {
        assert('bytesCount' in config);
        assert(typeof config['bytesCount'] === 'number');
      });

      it('default bytesCount to 8', function() {
        assert(config.bytesCount === 8);
      });
    });

    describe('default newId function', function() {
      describe('should generates', function() {
        it('a string id', function(done) {
          config.newId(function(e, newId) {
            assert(!e);
            assert(!!newId);
            assert(typeof newId === 'string');
            done();
          });
        });

        it('id with a length of bytesCount * 2', function(done) {
          var oldBytesCount = config.bytesCount;
          config.bytesCount = 2;
          config.newId(function(e, newId) {
            assert(!e);
            assert(!!newId);
            assert(newId.length === config.bytesCount * 2);

            config.bytesCount = oldBytesCount;
            done();
          });
        });
      });
    });

  });

  // main middleware function
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

    describe('when error', function() {
      it('should calls next middleware with error', function(done) {
        var oldConfig = index.config;
        index.config = { newId: function(cb) { cb('error', null); } };

        index({ }, null, function(e) {
          assert(!!e);

          index.config = oldConfig;
          done();
        });
      });
    });
  });

})();

