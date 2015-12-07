var views = {
  session:     '_id name email'
}


module.exports = new LogicDataHelper(

  views,

  ({select}) => ({

    session: r =>
      select.session(r)

  })

)
