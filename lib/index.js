"use strict";

module.exports = {
    twitter: {
        RESTClient: require("./twitter/TwitterRESTClient.class.js")
    },
    email: {
        EMail: require("./email/EMail.class.js"),
        SMTPSettings: require("./email/SMTPSettings.class.js"),
        SMTPClient: require("./email/SMTPClient.class.js")
    },
    facebook: {
        GraphAPI: require("./facebook/FacebookGraphAPI.class.js")
    }
};