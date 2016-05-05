var views = {
  // viewLean:      '_id userId type url referer',
  // clickLean:     '_id img ref'
}


module.exports = new LogicDataHelper(views,

  ({select}, TypesUtil) => ({

    // leanViews: r => {
    //   o = select.viewLean(r)
    //   o.utc = TypesUtil.BSONID.toMoment(o._id).format('MMMDD.HH:mm')
    //   if (o.url)
    //     o.url = o.url.replace('https://signup.heroku.com/', '')
    //                  .replace('&utm_medium=display&utm_source=airpair&utm_content=signup&utm_term=node&utm_content=top-900-banner', '')
    //   if (o.referer)
    //     o.referer = o.referer.replace('https://www.airpair.com', '')
    //   delete o.type
    //   return o
    // },

    // leanImpressions: r => {
    //   o = select.clickLean(r)
    //   o.utc = TypesUtil.BSONID.toMoment(o._id).format('MMMDD.HH:mm')
    //   if (o.ref)
    //     o.ref = o.ref.replace('https://www.airpair.com','')
    //   delete o.img
    //   return o
    // },

    ROI: r => {
      var weeks = {}
      for (var c of r.campaigns) {
        c.startStr = moment(c.start).format('YYYY MMM DD')
        c.endStr = moment(c.end).format('YYYY MMM DD')
        c.days = moment(c.end).diff(moment(c.start), 'days')
        c.delivered = 0
        c.clicks = 0

        for (var ad of c.ads) {
          for (var wkstart in ad.summary) {
            var key = wkstart
            if (!weeks[key]) {
              weeks[key] = {
                start: wkstart,
                period:
                  moment(wkstart,'YYYYMMDD').format('YYYY MMM DD') + ' - '
                  + moment(wkstart,'YYYYMMDD').add(6, 'day').format('MMM DD')
                  ,
                clicks: 0, impressions: 0,
                ads: {}, tags: {}
              }
            }

            var {clicks,impressions} = ad.summary[wkstart]

            weeks[key].ads[ad._id] = { clicks, impressions,
              _id: ad._id,
              cid: c._id,
              img: ad.img,
              tag: ad.tag }

            weeks[key].tags[ad.tag] =
              weeks[key].tags[ad.tag] || { tag: ad.tag, clicks: 0, impressions: 0 }

            weeks[key].tags[ad.tag].clicks += clicks
            weeks[key].tags[ad.tag].impressions += impressions

            weeks[key].clicks += clicks
            weeks[key].impressions += impressions
            // console.log('Project.ROI', c)

            c.delivered += impressions
            c.clicks += clicks
          }
        }
      }

      r.weeks = Object.keys(weeks).sort().reverse()
                      .map(key => weeks[key])

      return r
    }

  }),

  {
    mine({teamIds}) {
      return { teamId: { $in: teamIds } }
    }
  },

  {
    campaignRoi() {
      return { sort: { _id: -1 } }
    },
    getViews: { sort:{_id:-1}, select: views.viewLean }
  }

)
