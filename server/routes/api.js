module.exports = (app, mw) => {

  var map = new Map()
  map.set(/^\/logout$/,'/auth/logout')
  app.use(mw.req.forward({map}))


  app.API('report')
    .params('campaign')
    .get ({ getImpressions:        'campaign query.s'  })


  app.API('campaigns')
    .get ({ get:                   ''                  })

}
