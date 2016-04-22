module.exports = {

  weekOptions() {
    var opts = ''
    var mom = moment("20150803", "YYYYMMDD")
    while (mom < moment()) {
      opts = `<option value="${mom.format('YYYYMMDD')}">${mom.format('YYYY MM/DD')} Mon - Sun ${mom.add(6, 'day').format(' MM/DD')}</option>` + opts
      mom = mom.add(7, 'day')
    }

    return `<option value="select">-- select week --</option>` + opts
  }

}
