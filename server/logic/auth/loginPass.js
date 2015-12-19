module.exports = function(DAL, Data, Shared, Lib) {


  function validate(user, email, password) {
    if (!email) return 'Email required'
    if (!password) return 'Password required'
  }

  return {

    validate,


    exec(email, password, cb) {
      DAL.User.getByQuery({'emails.value':email}, (e, existing) => {
        if (!existing) cb(Error("you... are not authorized for this site"))
        if (password!='sfmedia2016') cb(Error("not authorized for this site"))
        DAL.Org.getManyByQuery({'teams.members.userId':existing._id}, (e, orgs) => {
          if (orgs.length==0) cb(Error("Must be a publisher to use this site"))
          existing.teamIds = []
          for (var org of orgs) {
            for (var team of org.teams) {
              if (_.find(team.members, m => m.userId.toString() == existing._id.toString()))
                existing.teamIds.push(team._id)
            }
          }
          cb(null, existing)
        })
      })
    },


    project: Data.Project.session

  }

}
