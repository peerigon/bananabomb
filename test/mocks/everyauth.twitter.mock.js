"use strict";

var twitterUserDataMock = require("./twitterUserData.mock.js");

module.exports = {
    middleware: function() {
        this.twitter.__findOrCreateUser();
    },
    twitter: {
        consumerKey: function (consumerKey) {
            return this;
        },
        consumerSecret: function (consumerSecret) {
            return this;
        },
        findOrCreateUserCallbackParams: {
            session:           "zqeijEPa",
            accessToken:       "aCcEsSTOkEN",
            accessTokenSecret: "AcCeSStoKenSecRET",
            twitterUserData:   twitterUserDataMock
        },
        __findOrCreateUser: function () {},
        findOrCreateUser: function (callback) {
            var self = this;
            self.__findOrCreateUser = function () {
                setTimeout(function () {
                    callback(
                        self.findOrCreateUserCallbackParams.session,
                        self.findOrCreateUserCallbackParams.accessToken,
                        self.findOrCreateUserCallbackParams.accessTokenSecret,
                        self.findOrCreateUserCallbackParams.twitterUserData
                    );
                }, 0);
            };
            return this;
        },
        redirectPath: function (redirectPath) {
            return this;
        }
    }
};