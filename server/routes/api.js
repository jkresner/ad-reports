module.exports = (app, mw) => {


  app.API('report')
    .params('campaign')
    .get ({ getCampaign:        'campaign query.s'  })
    .end()


  app.API('campaigns')
    .get ({ get:                ''                  })
    .end()

}


