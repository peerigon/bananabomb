"use strict";

var _ = require("underscore"),
    expect = require("expect.js"),
    indexReference = {
        twitter: {
            RESTClient: require("../lib/twitter/TwitterRESTClient.class.js")
        },
        email: {
           EMail: require("../lib/email/EMail.class.js"),
           SMTPSettings: require("../lib/email/SMTPSettings.class.js"),
           SMTPClient: require("../lib/email/SMTPClient.class.js")
        },
        facebook: {
            GraphAPI: require("../lib/facebook/FacebookGraphAPI.class.js")
        }

    },
    index = require("../lib/index.js");

describe("index.js", function () {
    it("should be eql", function () {
        expect(index).to.be.eql(indexReference)
    });
});