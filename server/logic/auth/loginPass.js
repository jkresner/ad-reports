module.exports = function(DAL, Data, Shared, Lib) {


  function validate(user, email, password) {
    if (!email) return 'Email required'
    if (!password) return 'Password required'
  }

  return {

    validate,


    exec({email, password}, cb) {

      DAL.User.getByQuery({'emails.value':email}, (e, r) => {
        if (!r) return cb(Error("you... are not authorized for this site"))

        if (password != 'sfmedia2016') return cb(Error("not authorized for this site"))

        DAL.Org.getManyByQuery({'teams.members.userId':r._id}, (e, orgs) => {
          if (orgs.length==0) cb(Error("Must be a publisher to use this site"))
          r.teamIds = []
          for (var org of orgs) {
            for (var team of org.teams) {
              if (_.find(team.members, m => m.userId.toString() == r._id.toString()))
                r.teamIds.push(team._id)
            }
          }

          cb(null, r)
        })
      })
    },


    project: Data.Project.session

  }

}
