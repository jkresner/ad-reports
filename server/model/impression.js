module.exports = ({ Id },
  { asSchema, required }) =>


asSchema({

  img:          { type: String },
  uId:          { type: Id },
  sId:          { type: String },
  ip:           { type: String },
  ref:          { type: String },
  ua:           { type: String }

})
