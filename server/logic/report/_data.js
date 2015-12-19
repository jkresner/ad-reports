var views = {
  viewLean:      '_id userId type url referer',
  clickLean:     '_id img ref'
}


module.exports = new LogicDataHelper(views,

  ({select}, TypesUtil) => ({

    leanViews: r => {
      o = select.viewLean(r)
      o.utc = TypesUtil.BSONID.toMoment(o._id).format('MMMDD.HH:mm')
      if (o.url)
        o.url = o.url.replace('https://signup.heroku.com/', '')
                     .replace('&utm_medium=display&utm_source=airpair&utm_content=signup&utm_term=node&utm_content=top-900-banner', '')
      if (o.referer)
        o.referer = o.referer.replace('https://www.airpair.com', '')
      delete o.type
      return o
    },

    leanImpressions: r => {
      o = select.clickLean(r)
      o.utc = TypesUtil.BSONID.toMoment(o._id).format('MMMDD.HH:mm')
      if (o.ref)
        o.ref = o.ref.replace('https://www.airpair.com','')
      delete o.img
      return o
    }

  }),

  {},

  {
    getViews: { sort:{_id:-1}, select: views.viewLean }
  }

)
