describe "Creating Users", ->
  describe "it should set admin flag to false by default", ->
    When -> @newUser = NgAdminApp.UserFactory.create
      name: "Jon Doe"
      email: "jondoe@mail.com"
    Then -> @newUser.admin == false

  describe "Create User Service", ->
    beforeEach(module("ng-admin-user-app"))
    beforeEach(inject ($http, _CreateUserService_) ->
      @CreateUserService = _CreateUserService_
      @httpPost = spyOn($http, 'post')
    )

    describe "it should create a user", ->
      Given -> @userParams =
        name: "Jon Doe"
        email: 'jondoe@mail.com'
        admin: true
      When -> @CreateUserService.create(@userParams)
      Then -> expect(@httpPost).toHaveBeenCalledWith('/api/users', @userParams)

    describe "when no arguments are provided", ->
      describe "it should not create the user", ->
        When -> @newUser = @CreateUserService.create()
        Then -> @newUser.errors.message == "A user needs a name and an email"

    describe "when no name is provided", ->
      describe "it should return an error", ->
        When -> @newUser = @CreateUserService.create(email: 'jondoe@mail.com')
        Then -> @newUser.errors.name == "Name can not be empty."

    describe "when the name is blank", ->
      describe "it should return an error", ->
        When -> @newUser = @CreateUserService.create
          name: ''
          email: 'jondoe@mail.com'
        Then -> @newUser.errors.name == "Name can not be empty."

    describe "when no email is provided", ->
      describe "it should return an error", ->
        When -> @newUser = @CreateUserService.create(name: 'Jon Doe')
        Then -> @newUser.errors.email == "Email can not be empty."
    
    describe "When an email is blank", ->
      describe "it should return an error", ->
        When -> @newUser = @CreateUserService.create(name: 'Jon Doe', email: '')
        Then -> @newUser.errors.email == "Email can not be empty."


