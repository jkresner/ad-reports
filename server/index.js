var maServer                 = require('meanair-server')
global.config                = maServer.Setup({
  auth: {
    appKey:                  'media',
    oauth:                   undefined
  },
  http: {
    port:                    process.env.PORT || 3333
  },
  model: {
    mongoUrl:               'mongodb://localhost/airpair_analytics',
    sessionStore:           { collection: 'sessions_media' }
  }
}, process.env.ENV || 'dev').config


function run(done) {

  var model = require('meanair-model')(done)

  model.connect(() =>

    maServer.App
            .init(config, done).meanair
            .lib({passport:require('passport')})
            .set(model)
            .merge(require('meanair-auth'))
            .use(config.middleware)
            .serve(config.routes)
            .run()

  )

}

run(e => e ? $log('APP.ERROR'.red, e) : '')
