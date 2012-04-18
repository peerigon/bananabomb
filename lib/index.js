"use strict";

module.exports = {
    twitter: {
//        Consumer: require("./twitter/TwitterConsumer.class.js"),
        RESTClient: require("./twitter/TwitterRESTClient.class.js"),
//        User: require("./twitter/TwitterUser.class.js"),
        Passport: require("./twitter/TwitterUser.class.js")
    },
    email: {
        EMail: require("./email/EMail.class.js"),
        SMTPSettings: require("./email/SMTPSettings.class.js"),
        SMTPClient: require("./email/SMTPClient.class.js")
    },
    facebook: {
//        Consumer: require("./facebook/FacebookConsumer.class.js"),
        GraphAPI: require("./facebook/FacebookGraphAPI.class.js"),
//        User: require("./facebook/FacebookUser.class.js"),
        Passport: require("./facebook/FacebookPassport.class.js")
    }
};