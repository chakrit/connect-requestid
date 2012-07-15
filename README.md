
### HOWTO

Adds this to your `.use` configuration block.

    app.use(require('connect-requestid'))

And that's it! :-)

Access the request id object with `request.id` like this:

    app.get('/', function(req, resp) {
      resp.send('hello request #' + req.id);
    });

...

