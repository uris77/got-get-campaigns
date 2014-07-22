/* Define custom server-side HTTP routes for lineman's development server
 *   These might be as simple as stubbing a little JSON to
 *   facilitate development of code that interacts with an HTTP service
 *   (presumably, mirroring one that will be reachable in a live environment).
 *
 * It's important to remember that any custom endpoints defined here
 *   will only be available in development, as lineman only builds
 *   static assets, it can't run server-side code.
 *
 * This file can be very useful for rapid prototyping or even organically
 *   defining a spec based on the needs of the client code that emerge.
 *
 */

var _ = require('underscore');
module.exports = {
  drawRoutes: function(app) {
    var users = [
      {name: "Asimoov", email: "asimov@mail.com", admin: false},
      {name: "Jon Doe", email: "jondoe@mail.com", admin: false},
      {name: "Jane Smith", email: "janesmith@mail.com", admin: false}
    ];
    app.post('/api/users', function (req, res) {
      if (!_.findWhere(users, {email: req.body.email})) users.push(req.body);
      res.json(req.body);
    });

    app.get('/api/users', function(req, res){
      res.json(users);
    });

    app.get("/api/my_details", function(req, res){
      var user_details = {
        name: "Akiva Karou",
        email: "akiva@estere.com",
        admin: true
      };
      res.json(user_details);
    });
  }
};
