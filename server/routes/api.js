module.exports = (app, mw) => {


  app.API('report')
    .middleware('authd inflateMe')
    .get ({ getClicks:            'body',
            getImpressions:       'body'             })
    .end()



}
