describe "Creating Users", ->
  describe "Create User Service", ->
    beforeEach(module("ng-admin-user-app"))
    beforeEach(inject (_CreateUserService_) ->
      @CreateUserService = _CreateUserService_
    )

    describe "it should create a user", ->
      When -> @newUser = @CreateUserService.create
        name: "Jon Doe"
        email: 'jondoe@mail.com'
        admin: true
      Then -> @newUser.name == "Jon Doe"
      And -> @newUser.email == "jondoe@mail.com"
      And -> @newUser.admin == true

    describe "it should set admin flag to false by default", ->
      When -> @newUser = @CreateUserService.create
        name: "Jon Doe"
        email: "jondoe@mail.com"
      Then -> @newUser.admin == false

