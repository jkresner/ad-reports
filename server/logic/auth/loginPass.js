module.exports = function(DAL, Data, Shared, Lib) {


  function validate(user, existing) {
  }

  return {

    validate,


    exec(login, done) {
      var {email,password} = login
      DAL.User.getByQuery({email}, (e, existing) => {
        // check password
      })
    },


    project: Data.Project.session

  }
}
