module.exports = ({ Id },
  { asSchema, required, trim, lowercase, unique }) =>


asSchema({

  userId:       { type: Id },
  anonymousId:  { type: String },
  objectId:     { type: Id  },
  type:         { type: String },
  url:          { type: String },
  campaign:     { type: {} },
  ip:           { type: String },
  ua:           { type: String },
  referer:      { type: String }

})
