var views = {
  list:     '_id teamId brand name code start end ads._id ads.url ads.shortUrl ads.code ads.img ads.width ads.height ads.positions ads.tag ads.summary'
}


module.exports = new LogicDataHelper(

  views,

  ({select}) => ({

    list: r => {
      r = select.list(r)
      r.start = moment(r.start).format('YYYY MMM DD')
      r.end = moment(r.end).format('YYYY MMM DD')
      for (var ad in r.ads) r.ads[ad].code = r.ads[ad].shortUrl.replace('https://www.airpair.com/visit/','')
      return r
    }

  }),

  {
    mine({teamIds}) {
      return { teamId: { $in: teamIds } }
    }
  },

  {
    list: { sort: { _id: -1 }, select: views.list }
    // , join: {teamId: 'name' } }
  }

)
