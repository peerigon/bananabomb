"use strict";

var SignaturInstance,
    modules;

function oAuthTools() {
    return require("./oAuthTools");
}

function Signature() {
    if (SignaturInstance === undefined) {
        SignaturInstance = require("./twitter/TwitterSignature.class")(oAuthTools());
    }
    return SignaturInstance;
}

modules = {
    twitter: {
        Consumer:       function (consumerKey, consumerSecret) {
            var TwitterConsumer = require("./twitter/TwitterConsumer.class");

            TwitterConsumer.call(this, consumerKey, consumerSecret);
        },
        Everyauth:      function (everyauth, twitterConsumer) {
            var Everyauth =  require("./twitter/TwitterEveryauth.class");

            Everyauth.call(this, everyauth, twitterConsumer);
        },
        RESTClient:     function (twitterUser, twitterConsumer) {
            var TwitterRESTClient = require("./twitter/TwitterRESTClient.class.js");

            TwitterRESTClient.call(this, twitterUser, twitterConsumer, Signature(), oAuthTools(), require("https"));
        },
        User:           function (twitterUserData) {
            var TwitterUser = require("./twitter/TwitterUser.class");

            TwitterUser.call(this, twitterUserData);
        }
    }
};

module.exports = modules;