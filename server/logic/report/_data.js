var views = {
  viewLean:      '_id userId type url'
}


module.exports = new LogicDataHelper(

  views,

  ({select}) => ({

    lean: r =>
      select.viewLean(r)

  })

)
