module.exports = (DAL, Data, Shared, Lib) => ({

  validate(user, campaign, start) {
    // console.log('validate'.white)
  },

  exec(campaign, start, cb) {
    var startUtc = moment(start, 'YYYYMMDD')
    var endUtc = moment(start, 'YYYYMMDD').add(1,'week')
    var startId = ObjectID.createFromTime(startUtc.format('X'))
    var endId = ObjectID.createFromTime(endUtc.format('X'))

    var adIds = _.pluck(campaign.ads, '_id')

    var imgs =  _.pluck(campaign.ads, 'img').map(i => i.replace('https://www.airpair.com/ad/',''))

    var q1 = { _id: { $gt: startId, $lt: endId }, img: { $in: imgs } }

    // $log('getImpressions.adIds'.gray, adIds)
    // $log('getImpressions.imgs'.gray, imgs)
    // $log('impressions.startId', startId, campaign.name)
    var r = {
      _id:campaign._id,
      name:campaign.name,
      start:startUtc.format('YYYY-MM-DD'),
      end:endUtc.format('YYYY-MM-DD'),
      total: { clicks: 0, impressions: 0 },
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

    // $log('getImpressions.match'.gray, q1)

    DAL.Impression.aggregate([

      { $match: q1 },
      { $project: { _id:1,img:1,ref:1 } },
      { $group: { _id:{ img:'$img',ref:'$ref'}, count: { $sum: 1 } } },
      { $sort: { count: -1 } },

    ], (e, aggImpressions) => {

      // $log('impressions'.gray, aggImpressions)

      for (var set of aggImpressions) {
        var ad = _.find(r.ads, ad => ad.img == set._id.img)
        ad.total.impressions += set.count
        r.total.impressions += set.count
        if (set.count > 1)
          ad.impressions.push({
            url: set._id.ref ? set._id.ref.replace('https://www.','') : 'unknown',
            count: set.count
          })
      }


      var q2 = { _id: { $gt: startId, $lt: endId }, oId: { $in: adIds } }
      DAL.View.aggregate([

        { $match: q2 },
        { $project: { _id:1,oId:1,url:1,ref:1 } },
        { $group: { _id:{ad:'$oId',ref:'$ref'}, count: { $sum: 1 } } },
        { $sort: { count: -1 } },

      ], (e, agg2) => {

        // $log('aggregated'.yellow, agg2, JSON.stringify(q2))
        for (var clicks of agg2) {
          var ad = _.find(r.ads, ad => ad._id == clicks._id.ad.toString())
          if (clicks.count > 1) {
            var refUrl = clicks._id.ref ? clicks._id.ref.split('airpair.com')[1] : 'unknown'

            ad.clicks.push({ url:refUrl, count: clicks.count })

            var ctr = _.find(ad.impressions, i => i.url.indexOf(refUrl) != -1)
            if (!ctr) console.log('set', clicks, refUrl)
            else ctr.clicks = clicks.count

            ad.total.clicks += clicks.count
            r.total.clicks += clicks.count
          }
        }

        r.ads = _.sortBy(r.ads, ad => -1 * ad.total.clicks)

        cb(e, r)

        Lib.updateRoiStats(campaign, start, r.ads)
      })
    })
  },

})


