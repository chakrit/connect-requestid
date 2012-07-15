

// index.js - Main exports file
(function() {

  var ID_BYTES = 32;

  var crypto = require('crypto')
    , cache = { };

  // generate new id using secure random bytes
  var generateNewId = function(callback) {
    return crypto.randomBytes(ID_BYTES, function(e, buf) {
      if (e) return callback(e, null);

      return callback(null, buf.toString('hex'));
    });
  };

  // the middleware
  module.exports = function(req, res, next) {
    return generateNewId(function(e, newId) {
      if (!!e) return next(e);

      req.id = newId;
      next();
    });
  };

  // export new id function for tesing.
  module.exports.generateNewId = generateNewId;

})();

