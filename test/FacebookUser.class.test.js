"use strict";

var expect              = require("expect.js"),
    FacebookUser        = require("../lib/facebook/FacebookUser.class.js"),
    facebookUser,
    facebookUserDataMock     = require("./mocks/facebookUserData.mock.js"),
    everyauthMock       = require("./mocks/everyauth.facebook.mock.js"),
    sessionDummy        = everyauthMock.facebook.findOrCreateUserCallbackParams.session,
    accessTokenDummy    = everyauthMock.facebook.findOrCreateUserCallbackParams.accessToken,
    accessTokExtraDummy = everyauthMock.facebook.findOrCreateUserCallbackParams.accessTokExtra;


describe("FacebookUser", function () {

    describe("#__construct & #__isFacebookUserData", function () {
        it("should throw an error without giving facebookUserData", function () {
            expect(function () {
                new FacebookUser();
            }).to.throwException();
        });
        it("should throw an error giving any object", function () {
            expect(function () {
                new FacebookUser({});
            }).to.throwException();
        });
        it("should be an instance of FacebookUser", function () {
            expect(new FacebookUser(facebookUserDataMock)).to.be.a(FacebookUser);
        });
    });
    
    facebookUser = new FacebookUser(facebookUserDataMock);
    describe("#getId", function () {
        it("should return an id equal to facebookUserDataMock.id", function () {
            expect(facebookUser.getId()).to.be.equal(facebookUserDataMock.id);
        });
    });
    
    describe("#setSession", function () {
        it("should return a reference to a facebookUser", function () {
            expect(facebookUser.setSession(sessionDummy)).to.be.equal(facebookUser);
        });
    });

    describe("#getSession", function () {
        it("should return a value equal to sessionDummy.", function () {
            expect(facebookUser.getSession()).to.be.equal(sessionDummy);
        });
    });
    
    describe("#setAccessToken", function () {
        it("should return a reference to a facebookUser", function () {
            expect(facebookUser.setAccessToken(accessTokenDummy)).to.be.equal(facebookUser);
        });
    });
    
    describe("#getAccessToken", function () {
        it("should return a value equal to accessTokenDummy.", function () {
            expect(facebookUser.getAccessToken()).to.be.equal(accessTokenDummy);
        });
    });
    
    describe("#setAccessTokExtra", function () {
        it("shoould return a reference to a facebookUser", function () {
            expect(facebookUser.setAccessTokExtra(accessTokExtraDummy)).to.be.equal(facebookUser);
        });
    });
    
    describe("#getAccessTokExtra", function () {
        it("should return a value equal to accessTokExtra.", function () {
            expect(facebookUser.getAccessTokExtra()).to.be.equal(accessTokExtraDummy);
        });
    });
    
    
    
});