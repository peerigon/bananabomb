"use strict";

var _ = require("underscore"),
    expect = require("expect.js"),
    indexReference = {
        twitter: {
            Consumer: require("../lib/twitter/TwitterConsumer.class.js"),
            RESTClient: require("../lib/twitter/TwitterRESTClient.class.js"),
            User: require("../lib/twitter/TwitterUser.class.js")
        },
        email: {
           EMail: require("../lib/email/EMail.class.js"),
           SMTPSettings: require("../lib/email/SMTPSettings.class.js"),
           SMTPClient: require("../lib/email/SMTPClient.class.js")
        },
        facebook: {
            Consumer: require("../lib/facebook/FacebookConsumer.class.js"),
            GraphAPI: require("../lib/facebook/FacebookGraphAPI.class.js"),
            User: require("../lib/facebook/FacebookUser.class.js")
        }

    },
    index = require("../lib/index.js");

describe("index.js", function () {
    it("should be eql", function () {
        expect(index).to.be.eql(indexReference)
    });
});