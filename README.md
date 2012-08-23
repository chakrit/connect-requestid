[![build status](https://secure.travis-ci.org/chakrit/connect-requestid.png)](http://travis-ci.org/chakrit/connect-requestid)

This package is useful for correlating your log messages across multiple requests
(if you emit multiple log entries for each request).

### HOWTO

Adds this to your `.use` configuration block.

    app.use(require('connect-requestid'))

And that's it! :-)

Access the request id object with `request.id` like this:

    app.get('/', function(req, resp) {
      resp.send('hello request #' + req.id);
    });

### CONFIG

The following options are available for configuration:

* `middleware.config.bytesCount` - The number of bytes to use in the default newId function.
* `middleware.config.newId` - `function(callback(e, newId))` to use for generating a new id.

The default `newId` function generates a new id using node's `require('crypto').randomBytes` method.

