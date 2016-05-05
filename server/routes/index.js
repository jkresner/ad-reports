module.exports = (app, mw) => {

  var pageOpts = { layout: false, cfg: { static: { host:`http://localhost:8000` } } }
  mw.cache('page', mw.res.page('index', pageOpts))



  app.API('report')
    .params('campaign')
    .get ({ getImpressions:        'campaign query.s'  ,
            getRoi:                ''                  })


  app.API('campaigns')
    .get ({ get:                   ''                  })



  app.get('/',
    mw.$.session,
    mw.res.forbid('authd', req => req.user ? 'already authd' : 0, { redirect: req => '/campaigns' }),
    mw.$.page)


  app.get(['^/campaigns',
           '^/roi'],
    mw.$.session,
    mw.res.forbid('anon', req => req.user ? 0 : 'must login' , { redirect: req => '/' }),
    mw.$.page)


  app.get(['^/impressions'],
    mw.$.session,
    mw.res.forbid('anon', req => req.user ? 0 : 'must login' , { redirect: req => '/' }),
    (req, res, next) => {
      app.meanair.logic.campaigns.get.exec.call(req, (e, campaigns) => {
        assign(req.locals,{campaigns:campaigns})
        next(e)
      })
    },
    mw.$.page)


}
