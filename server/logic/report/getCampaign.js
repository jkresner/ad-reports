module.exports = (DAL, Data, Shared, Lib) => ({

  validate(user, campaign, start) {
    console.log('validate'.white)
  },

  exec(campaign, start, cb) {
    var startUtc = moment(start, 'YYYYMMDD')
    var endUtc = moment(start, 'YYYYMMDD').add(1,'weeks')
    var startId = ObjectID.createFromTime(startUtc.format('X'))
    var endId = ObjectID.createFromTime(endUtc.format('X'))
    var adIds = _.pluck(campaign.ads, '_id')
    var imgs =  _.pluck(campaign.ads, 'img').map(i => i.replace('https://www.airpair.com/ad/',''))

    var q1 = { _id: { $gt: startId, $lt: endId }, img: { $in: imgs } }
    DAL.Impression.aggregate([

      { $match: q1 },
      { $project: { _id:1,img:1,ref:1 } },
      { $group: { _id:{ img:'$img',ref:'$ref'}, count: { $sum: 1 } } },
      { $sort: { count: -1 } },

    ], (e, agg1) => {
      var r = {
        _id:campaign._id,
        name:campaign.name,
        start:startUtc.format('YYYY-MM-DD'),
        end:endUtc.format('YYYY-MM-DD'),
        ads:[]
      }
      for (var ad of campaign.ads)
        r.ads.push({
          _id: ad._id.toString(),
          code: ad.shortUrl.replace('https://www.airpair.com/visit/',''),
          img: ad.img.replace('https://www.airpair.com/ad/',''),
          total: { clicks: 0, impressions: 0 },
          clicks: [],
          impressions: []
        })

      for (var set of agg1) {
        var ad = _.find(r.ads,ad=>ad.img == set._id.img)
        ad.total.impressions += set.count
        if (set.count > 1)
          ad.impressions.push({
            url: set._id.ref ? set._id.ref.replace('https://www.','') : 'unknown',
            count: set.count
          })
      }


      var q2 = { _id: { $gt: startId, $lt: endId }, objectId: { $in: adIds } }
      DAL.View.aggregate([

        { $match: q2 },
        { $project: { _id:1,objectId:1,url:1,referer:1 } },
        { $group: { _id:{ad:'$objectId',ref:'$referer'}, count: { $sum: 1 } } },
        { $sort: { count: -1 } },

      ], (e, agg2) => {
        // $log('aggregated'.yellow, agg2, JSON.stringify(q2))
        for (var set of agg2) {
          var ad = _.find(r.ads,ad=>ad._id == set._id.ad.toString())
          ad.total.clicks += set.count
          if (set.count > 1)
            ad.clicks.push({
              url: set._id.ref ? set._id.ref.replace('https://www.','') : 'unknown',
              count: set.count
            })
        }

        r.ads = _.sortBy(r.ads, ad => -1 * ad.total.clicks)
        cb(e, r)
      })
    })
  },

})


