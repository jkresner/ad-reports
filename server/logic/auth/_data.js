var views = {
  session:     '_id name teamIds'
}


module.exports = new LogicDataHelper(

  views,

  ({select}) => ({

    session: r =>
      select.session(r)

  })

)
