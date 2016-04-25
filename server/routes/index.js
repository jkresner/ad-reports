module.exports = (app, mw) => {

  var pageOpts = { layout: false, cfg: { static: { host:`http://localhost:8000` } } }
  mw.cache('page', mw.res.page('index', pageOpts))



  app.API('report')
    .params('campaign')
    .get ({ getImpressions:        'campaign query.s'  })


  app.API('campaigns')
    .get ({ get:                   ''                  })



  app.get('/',
    mw.$.session,
    mw.res.forbid('authd', req => req.user ? 'already authd' : 0, { redirect: req => '/campaigns' }),
    mw.$.page)


  app.get(['^/campaigns',
           '^/impressions',
           '^/roi'],
    mw.$.session,
    mw.res.forbid('anon', req => req.user ? 0 : 'must login' , { redirect: req => '/' }),
    mw.$.page)

}
