
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

The default `newId` function generates a new id using node.js `crypto` module.

