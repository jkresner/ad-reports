module.exports = (app, mw) => {

  mw.cache('angular1Page',  mw.res.page('angular1'))


  app.get('/',
    mw.$.session,
    mw.res.forbid('authd', usr => usr, { redirect: req => '/reports' }),
    mw.$.angular1Page)


  app.get(['^/campaigns',
           '^/impressions',
           '^/roi'],
    mw.$.session,
    mw.$.authd,
    mw.$.setReturnTo,
    mw.$.angular1Page)

}
