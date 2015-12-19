var maServer                 = require('meanair-server')
global.config                = maServer.Setup({
  auth: {
    appKey:                  'adsrv',
    oauth:                   undefined,
    orgs:                    true,
    password:                { login: true, logic: 'loginPass' }
  },
  comm:                      undefined,
  http: {
    cookieSecret:            process.env.HTTP_COOKIESECRET || 'adsmony',
    port:                    process.env.PORT || 3333,
    static:                  { dirs: 'dist' },
    security:                undefined,
  },
  log:                       { app: undefined, auth: undefined, 'wrpr': undefined },
  middleware: {
    session:                 { authedData: "_id name teamIds" },
    plugins:                 []
  },
  model: {
    mongoUrl:                process.env.MODEL_MONGOURL || 'mongodb://localhost/airpair_analytics',
    sessionStore:            { collection: 'sess_adsrv' }
  }
}, process.env.ENV || 'dev').config


global.ObjectID     = require('mongodb').ObjectID


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


run(e => e ? $log('APP.ERROR'.red, e) : 0)
