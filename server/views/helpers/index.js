'use strict'

module.exports = {

  weekOptions(campaings) {
    var opts = ''

    var current = moment() //.add(-7, 'day')
    for (var c of campaings) {
      let group = ''
      let mom = moment(c.start)
      // let ended = moment(c.end).add(-7, 'day')
      while (mom < moment(c.end) && mom < current) {
        let start = mom
        let end = moment(mom).add(6, 'day')
        group = `<option value="${c._id}:${start.format('YYYYMMDD')}">${start.format('YYYY MM/DD')} Mon - Sun ${end.format(' MM/DD')}</option>` + group
        mom.add(7, 'day')
      }
      opts += `<optgroup label="${c.name}">${group}</optgroup>`
    }

    // var opts = ''
    // var mom = moment("20150803", "YYYYMMDD")
    // while (mom < moment().add(-7, 'day')) {
    //   var start = mom.add(7, 'day')
    //   var end = moment(mom).add(6, 'day')
    //   opts = `<option value="${start.format('YYYYMMDD')}">${start.format('YYYY MM/DD')} Mon - Sun ${end.format(' MM/DD')}</option>` + opts
    // }

    return `<option value="select">-- select week --</option>` + opts
  }

}
