module.exports = (DAL, {Query,Project,Opts}, Shared, Lib) => ({


  validate(user, search) {
  },


  exec(cb) {
    DAL.Campaign.getManyByQuery(Query.mine(this.user), Opts.list, cb)
  },


  project: Project.list


})

