"use strict";

var facebookUserDataMock = require("./facebookUserData.mock.js");

module.exports = {
    middleware: function() {
        this.facebook.__findOrCreateUser();
    },
    facebook: {
        appId: function (appId) {
            return this;
        },
        appSecret: function (appSecret) {
            return this;
        },
        findOrCreateUserCallbackParams: {
            session:            "zqeijEPa",
            accessToken:        "aCcEsSTOkEN",
            accessTokExtra:     "AcCeSStoKenSecRET",
            facebookUserData:   facebookUserDataMock
        },
        __findOrCreateUser: function () {},
        findOrCreateUser: function (callback) {
            var self = this;
            self.__findOrCreateUser = function () {
                setTimeout(function () {
                    callback(
                        self.findOrCreateUserCallbackParams.session,
                        self.findOrCreateUserCallbackParams.accessToken,
                        self.findOrCreateUserCallbackParams.accessTokExtra,
                        self.findOrCreateUserCallbackParams.facebookUserData
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