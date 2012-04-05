"use strict";

var expect              = require("expect.js"),
    FacebookConsumer    = require("../lib/facebook/FacebookConsumer.class"),
    facebookConsumer,
    appIdDummy          = 123453152346361,
    appSecretDummy      = "f3j4weuteot3jthqowetuo345qwfj3";

describe("FacebookConsumer", function () {
    
    describe("#__construct", function() {
        it("should throw an Error without an AppId and AppSecret", function () {
            expect(function () {
                new FacebookConsumer();
            }).to.throwException();
            expect(function () {
                new FacebookConsumer(appIdDummy, undefined);
            }).to.throwException();
            expect(function () {
                new FacebookConsumer(undefined, appSecretDummy);
            }).to.throwException();
        });
        it("should be a FacebookConsumer", function () {
            expect(new FacebookConsumer(appIdDummy, appSecretDummy)).to.be.a(FacebookConsumer);
        });
    });
    
    facebookConsumer = new FacebookConsumer(appIdDummy, appSecretDummy);
    describe("#getAppId", function () {
        it("should be a value equal to AppIdDummy.", function () {
            expect(facebookConsumer.getAppId()).to.be.equal(appIdDummy);
        });
    });
    
    describe("#getAppSecret", function () {
        it("should be a value equal to AppSecretDummy.", function () {
            expect(facebookConsumer.getAppSecret()).to.be.equal(appSecretDummy);
        });
    });
    
});