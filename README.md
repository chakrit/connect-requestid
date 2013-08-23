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

### GENERATOR

The id is generated from the `require('connect-requestid').generator` function. This
function will by default uses the [node-uuid][0] module to generates 16 bytes of a unique
identifier each time it is called.

You can replace this function with your own custom implementation with the signature
`generator(callback)` and calls the callback function with the standard `callback(e,
string)` to return the generated id.

 [0]: https://github.com/broofa/node-uuid
