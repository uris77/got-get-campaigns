var NgAdminApp = NgAdminApp || {};
NgAdminApp.UserFactory = {
  create: function(params) {
    var user = {
      admin: false
    };
    if (params.name) {
      user.name = params.name;
    }
    if (params.email) {
      user.email = params.email;
    }
    if (params.admin) {
      user.admin = params.admin;
    }
    return user;
  }
};

