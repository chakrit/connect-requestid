
// index.js - Main exports file
module.exports = (function() {

  var uuid = require('uuid').v4
    , Buffer = require('buffer').Buffer
    , buffer = new Buffer(16);

  middleware.generator = function(callback) {
    uuid({ }, buffer);
    callback(null, buffer.toString('hex'));
  };

  return middleware

  function middleware(req, resp, next) {
    return middleware.generator(function(e, newId) {
      if (e) return next(e);

      req.id = newId;
      resp.setHeader('X-Request-Id', newId);
      next();
    });
  };

})();

