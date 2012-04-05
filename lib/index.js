"use strict";

module.exports = {
    twitter: {
        Consumer: require("./twitter/TwitterConsumer.class.js"),
        Everyauth: require("./twitter/TwitterEveryauth.class.js"),
        RESTClient: require("./twitter/TwitterRESTClient.class.js"),
        User: require("./twitter/TwitterUser.class.js")
    },
    email: {
        EMail: require("./email/EMail.class.js"),
        SMTPSettings: require("./email/SMTPSettings.class.js"),
        SMTPClient: require("./email/SMTPClient.class.js")
    },
    facebook: {
        Consumer: require("./facebook/FacebookConsumer.class.js"),
        Everyauth: require("./facebook/FacebookEveryauth.class.js"),
        GraphApi: require("./facebook/FacebookGraphApi.class.js"),
        User: require("./facebook/FacebookUser.class.js")
    }
};