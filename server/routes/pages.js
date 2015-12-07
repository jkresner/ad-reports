module.exports = (app,mw) => {

  mw.cache('angular1Page',      mw.res.page('angular1'))


  var {bundle}      = config.http.static

  app.locals = _.extend(app.locals, {bundle})

  app.get('/', mw.$.setReturnTo,
    mw.res.forbid('authd', usr => usr, { redirect: req => '/report' }),
    mw.$.angular1Page)


  app.get(['/report'
           ],
           mw.$.authd, mw.$.angular1Page)

}
