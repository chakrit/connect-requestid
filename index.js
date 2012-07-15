
// index.js - Main exports file
(function() {

  var crypto = require('crypto');

  // the middleware
  var mw = function(req, resp, next) {
    return mw.config.newId(function(e, newId) {
      if (!!e) return next(e);

      req.id = newId;
      next();
    });
  };

  // generate new id using secure random bytes
  mw.config = { bytesCount: 8 };
  mw.config.newId = function(callback) {
    return crypto.randomBytes(mw.config.bytesCount, function(e, buf) {
      if (e) return callback(e, null);

      return callback(null, buf.toString('hex'));
    });
  };

  // exports the middleware
  module.exports = mw;

})();

