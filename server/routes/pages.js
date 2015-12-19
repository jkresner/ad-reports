module.exports = (app,mw) => {

  // var {bundles}      = config.http.static
  // app.locals = _.extend(app.locals, {bundle})
  mw.cache('angular1Page',  mw.res.page('angular1'))


  app.get('/', mw.$.setReturnTo,
    mw.res.forbid('authd', usr => usr, { redirect: req => '/reports' }),
    mw.$.angular1Page)


  app.get(['/campaigns',
           '/reports'],
    mw.$.authd,
    mw.$.angular1Page)

}
