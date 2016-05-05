module.exports = (DAL, {Project,Query,Opts}, Shared, Lib) => ({

  validate(user, campaign, start) {
    // console.log('validate'.white)
  },

  exec(cb) {
    DAL.Campaign.getManyByQuery(Query.mine(this.user), Opts.campaignRoi(), (e, r) => {
      cb(e, {campaigns:r})
    })

    // $log('getImpressions.adIds'.gray, adIds)

// heroku/900x90.q2-1.ruby.png

    // var imgs =  _.pluck(campaign.ads, 'img').map(i => i.replace('https://www.airpair.com/ad/',''))
    // $log('getImpressions.imgs'.gray, imgs)

    // var q1 = { _id: { $gt: startId, $lt: endId }, img: { $in: imgs } }

    // $log('impressions.startId', startId, campaign.name)
    // var r = {
    //   _id:campaign._id,
    //   name:campaign.name,
    //   start:startUtc.format('YYYY-MM-DD'),
    //   end:endUtc.format('YYYY-MM-DD'),
    //   ads:[]
    // }

    // for (var ad of campaign.ads)
    //   r.ads.push({
    //     _id: ad._id.toString(),
    //     code: ad.shortUrl.replace('https://www.airpair.com/visit/',''),
    //     img: ad.img.replace('https://www.airpair.com/ad/',''),
    //     total: { clicks: 0, impressions: 0 },
    //     clicks: [],
    //     impressions: []
    //   })

    // // $log('getImpressions.match'.gray, q1)

    // DAL.Impression.aggregate([

    //   { $match: q1 },
    //   { $project: { _id:1,img:1,ref:1 } },
    //   { $group: { _id:{ img:'$img',ref:'$ref'}, count: { $sum: 1 } } },
    //   { $sort: { count: -1 } },

    // ], (e, agg1) => {

    //   // $log('agg1'.gray, agg1)

    //   for (var set of agg1) {
    //     var ad = _.find(r.ads,ad => ad.img == set._id.img)
    //     ad.total.impressions += set.count
    //     if (set.count > 1)
    //       ad.impressions.push({
    //         url: set._id.ref ? set._id.ref.replace('https://www.','') : 'unknown',
    //         count: set.count
    //       })
    //   }


    //   var q2 = { _id: { $gt: startId, $lt: endId }, oId: { $in: adIds } }
    //   DAL.View.aggregate([

    //     { $match: q2 },
    //     { $project: { _id:1,oId:1,url:1,ref:1 } },
    //     { $group: { _id:{ad:'$oId',ref:'$ref'}, count: { $sum: 1 } } },
    //     { $sort: { count: -1 } },

    //   ], (e, agg2) => {

    //     // $log('aggregated'.yellow, agg2, JSON.stringify(q2))
    //     for (var set of agg2) {
    //       var ad = _.find(r.ads, ad => ad._id == set._id.ad.toString())
    //       if (set.count > 1) {
    //         var url = set._id.ref ? set._id.ref.replace('https://www.','') : 'unknown'
    //         ad.total.clicks += set.count
    //         ad.clicks.push({ url, count: set.count })
    //         var ctr = _.find(ad.impressions, i => i.url.indexOf(url) != -1)
    //         if (!ctr) console.log('set', set)
    //         else ctr.clicks = set.count
    //       }
    //     }

    //     r.ads = _.sortBy(r.ads, ad => -1 * ad.total.clicks)
    //     cb(e, r)
    //   })
    // })
  },

  project: Project.ROI

})


