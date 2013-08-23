
// test.js - Test index.js
(function() {

  var tap = require('tap')
    , sinon = require('sinon');

  tap.test('module exports', function(t) {

    var reqId = require('./index');

    t.type(reqId, 'function', 'is a function');
    t.equal(reqId.length, 3, 'accepts 3 arguments');

    t.test('generator function', function(t) {
      t.type(reqId.generator, 'function', 'is modifiable');

      sinon.spy(reqId, 'generator');
      reqId({ }, null, function() {
        t.ok(reqId.generator.called, 'called when middleware is invoked');
        t.end();
      });
    });

    t.test('middleware called', function(t) {
      var req = { };
      reqId(req, null, function() {
        t.type(req.id, 'string', 'an id is gnerated');
        t.end();
      });
    });

    t.test('1000 iteration', function(t) {
      var i, cache = Object.create(null);

      t.plan(1000);
      for (i = 0; i < 1000; i++) (function(req, i) {
        reqId(req, null, function() {
          t.notOk(cache[req.id], 'id is unique for iteration: #' + i);
          cache[req.id] = true;
        });
      })({ }, i);
    });

    t.end()

  });

})();

