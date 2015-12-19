module.exports = {

  jk: {
    "_id" : ObjectId("5175efbfa3802cc4d5a5e6ed"),
    "initials" : "jk",
    "bio" : "AirPair.com Founder",
    "location" : {
        "timeZoneId" : "Australia/Sydney",
        "shortName" : "Sydney Olympic Park",
        "name" : "Sydney Olympic Park NSW, Australia"
    },
    "auth" : {
      password: {
        hash: '$2a$08$/EqlTL6peWQc8vkE3Mmlp.4ATAT00IrDFaw/GVtcPnmPoThQA1fCW'
      }
    },
    "emails" : [
        {
            "verified" : true,
            "primary" : true,
            "value" : "jk@airpair.com",
            "_id" : ObjectId("564cc461ad9bf71200e632b4"),
            "lists" : []
        },
        {
            "origin" : "oauth:github",
            "verified" : true,
            "value" : "jkresner@gmail.com",
            "primary" : false,
            "_id" : ObjectId("5626efeb1f00041100c2e524"),
            "lists" : []
        }
    ],
    "email" : "jk@airpair.com",
    "emailVerified" : true,
    "name" : "Jonathon Kresner",
    "meta" : null
  },


  melk: {
    "_id" : ObjectId("5672facac554f496b6e1e145"),
    "initials" : "mk",
    "location": {
      "timeZoneId" : "America/Los_Angeles",
      "shortName" : "San Francisco",
      "name" : "San Francisco, CA, USA"
    },
    "auth" : {
      password: {
        hash: '$2a$08$/EqlTL6peWQc8vkE3Mmlp.4ATAT00IrDFaw/GVtcPnmPoThQA1fCW'
      }
    },
    "emails" : [
      {
          "_id" : ObjectId("5672facac554f496b6e1e146"),
          "verified" : true,
          "primary" : true,
          "value" : "melanie@mediamatterssf.com"
      }
    ],
    "name" : "Melanie Kennedy"
  },


  sals: {
    "_id" : ObjectId("5672facac554f496b6e1e140"),
    "initials" : "ss",
    "location": {
      "timeZoneId" : "America/Los_Angeles",
      "shortName" : "San Francisco",
      "name" : "San Francisco, CA, USA"
    },
    "auth" : {
      password: {
        hash: '$2a$08$/EqlTL6peWQc8vkE3Mmlp.4ATAT00IrDFaw/GVtcPnmPoThQA1fCW'
      }
    },
    "emails" : [
      {
          "_id" : ObjectId("5672facac554f496b631e146"),
          "verified" : true,
          "primary" : true,
          "value" : "sally@mediamatterssf.com"
      }
    ],
    "name" : "Sally Sclippa"
  }

}
