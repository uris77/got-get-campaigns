var NgAdminApp = NgAdminApp || {};
function InvalidArgumentsError(msg) {
  this.name = "InvalidArgumentsError";
  this.message = (msg || "");
}

InvalidArgumentsError.prototype = new Error();

NgAdminApp.UserFactory = {
  create: function(params) {
    var user = {
      admin: false,
      enabled: true,
      errors: {}
    };
    if(params){
      if (params.username) {
        user.username = params.username;
      }else {
        user.errors.username = "Username can not be empty.";
      }
      if (params.email) {
        user.email = params.email;
      } else {
        user.errors.email = "Email can not be empty.";
      }
      if (_.isBoolean(params.admin)) {
        user.admin = params.admin;
      }
    } else {
      user.errors.message = "A user needs a name and an email";
    }
    return user;
  }
};

