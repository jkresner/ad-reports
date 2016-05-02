module.exports = {

  weekOptions() {
    var opts = ''
    var mom = moment("20150803", "YYYYMMDD")
    while (mom < moment().add(-7, 'day')) {
      var start = mom.add(7, 'day')
      var end = moment(mom).add(6, 'day')
      opts = `<option value="${start.format('YYYYMMDD')}">${start.format('YYYY MM/DD')} Mon - Sun ${end.format(' MM/DD')}</option>` + opts
    }

    return `<option value="select">-- select week --</option>` + opts
  }

}
