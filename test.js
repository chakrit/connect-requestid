
// test.js - Test index.js
(function() {

  var MAGNITUDE = 10000;

  var tap = require('tap')
    , sinon = require('sinon')
    , resp = { 'setHeader': function() { } };

  tap.test('module exports', function(t) {

    var reqId = require('./index');

    t.type(reqId, 'function', 'is a function');
    t.equal(reqId.length, 3, 'accepts 3 arguments');

    t.test('generator function', function(t) {
      t.type(reqId.generator, 'function', 'is modifiable');

      sinon.spy(reqId, 'generator');
      reqId({ }, resp, function() {
        t.ok(reqId.generator.called, 'called when middleware is invoked');
        reqId.generator.restore()
        t.end();
      });
    });

    t.test('middleware called', function(t) {
      var req = { };

      sinon.spy(resp, 'setHeader')
      reqId(req, resp, function() {
        t.type(req.id, 'string', 'an id is gnerated');
        t.ok(resp.setHeader.calledWith('X-Request-Id'), 'X-Request-Id header set');
        t.end();
      });
    });

    t.test(MAGNITUDE + ' iterations', function(t) {
      var i, cache = Object.create(null);

      t.plan(MAGNITUDE);
      for (i = 0; i < MAGNITUDE; i++) (function(req, i) {
        reqId(req, resp, function() {
          t.notOk(cache[req.id], 'id is unique for iteration: #' + i);
          cache[req.id] = true;
        });
      })({ }, i);
    });

    t.end()

  });

})();

