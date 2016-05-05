module.exports = ({ Id },
   { asSchema, required, trim, lowercase, unique, index, sparse }) => {


var serveSchema = {
  _id:        { type: Id, ref: 'Impression', unique, sparse },
  click:      { type: Id, ref: 'View', unique, sparse },
  uid:        { type: Id },
  ref:        { type: String }
}


var adSchema = asSchema({

  url:          { type: String, unique },
  shortUrl:     { type: String, unique },
  img:          { type: String, unique },
  width:        { type: Number, required },
  height:       { type: Number, required },
  positions:    { type: [String] },
  tag:          { type: String },  // slug
  served:       { type: [serveSchema] },
  summary:      {}

})


return asSchema({

  teamId:       { type: Id, ref: 'Team', required },
  brand:        { type: String, required },
  spend:        { type: Number },
  target:       { type: Number },
  name:         { type: String, required, unique },
  code:         { type: String, required, unique },
  start:        { type: Date, required },
  end:          { type: Date, required },
  ads:          [adSchema],

})


}
