"use strict";

module.exports = {
    twitter: {
        RESTClient:     require("./twitter/TwitterRESTClient.class.js"),
        Consumer:       require("./twitter/TwitterConsumer.class"),
        Everyauth:      require("./twitter/TwitterEveryauth.class"),
        Signature:      require("./twitter/TwitterSignature.class"),
        User:           require("./twitter/TwitterUser.class")
    }
};