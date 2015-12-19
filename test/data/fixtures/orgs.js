module.exports = {

  heroku: {
    _id:                      ObjectId("5672fd62c554f496b6e1e146"),
    emailDomains:             ['heroku.com','mediamatterssf.com'],
    info: {
      name:                   'Heroku',
      website:                'www.heroku.com'
    },
    cohort: {
      industry:               'Hosting',
      category:               'enterpise',
      staff:                  '100-500',
      developers:             '100-500'
    },
    teams: [{
      _id:                    ObjectId("5672fd62c554f496b6e1e149"),
      creatorId:              ObjectId("5175efbfa3802cc4d5a5e6ed"), //jk
      status:                 'active',
      name:                   'MediaMatters SF',
      nickName:               'MediaMatters',
      slug:                   '/mediamatters-sf',
      avatar:                 'http://www.mediamatterssf.com/images/logo.gif',
      members: [
        {
          _id:                  ObjectId("5672facac554f496b6e1e150"),
          userId:               ObjectId("5672facac554f496b6e1e140"),
          email:                'sally@mediamatterssf.com',
          scopes:               ['campaign:read'],     // essentially roles and permissions
          status:               'active'
        },
        {
          _id:                  ObjectId("5672facac554f496b6e1e140"),
          userId:               ObjectId("5672facac554f496b6e1e145"),
          email:                'melanie@mediamatterssf.com',
          scopes:               ['campaign:read'],     // essentially roles and permissions
          status:               'active'
        },
        {
          _id:                  ObjectId("5672facac554f496b6e1e130"),
          userId:               ObjectId("5175efbfa3802cc4d5a5e6ed"),
          email:                'jk@airpair.com',
          scopes:               ['campaign:admin'],     // essentially roles and permissions
          status:               'active'
        }
      ],
      meta:                   null
    }]
  }

}

