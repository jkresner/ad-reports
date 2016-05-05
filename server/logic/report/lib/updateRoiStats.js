module.exports = ({Campaign}) =>

  (campaign, week, stats) => {

  var weekStart = moment(week, 'YYYYMMDD')

  if (moment(campaign.end).isBefore(weekStart))
    return


  var currentWeek = weekStart.isAfter(moment().add(-7, 'day'))

  var {ads} = campaign

  for (var adStats of stats) {
    var ad = _.find(ads, a => a._id.toString() == adStats._id.toString())
    if (!ad.summary[week] || currentWeek)
      ad.summary[week] = adStats.total    // # impressions + # clicks
  }

  Campaign.updateSet(campaign._id, {ads}, () => {})


}

