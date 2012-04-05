"use strict";

var expect                  = require("expect.js"),
    TwitterUser             = require("../lib/twitter/TwitterUser.class.js"),
    twitterUser,
    twitterUserDataMock     = require("./mocks/twitterUserData.mock.js"),
    everyauthMock           = require("./mocks/everyauth.twitter.mock.js"),
    sessionDummy            = everyauthMock.twitter.findOrCreateUserCallbackParams.session,
    accessTokenDummy        = everyauthMock.twitter.findOrCreateUserCallbackParams.accessToken,
    accessTokenSecretDummy  = everyauthMock.twitter.findOrCreateUserCallbackParams.accessTokenSecret;

describe("TwitterUser", function () {
    
    before(function () { 
        twitterUser = new TwitterUser(twitterUserDataMock);
    });
    
    describe("#setSession", function () {
        it("should return a reference to twitterUser", function () {
            expect(twitterUser.setSession(sessionDummy)).to.be.equal(twitterUser);
        });
    });

    describe("#getSession", function () {
        it("should return a value equal to sessionDummy.", function () {
            expect(twitterUser.getSession()).to.be.equal(sessionDummy);
        });
    });

    describe("#setAccessToken", function () {
        it("should return a reference to twitterUser", function () {
            expect(twitterUser.setAccessToken(accessTokenDummy)).to.be.equal(twitterUser);
        });
    });

    describe("#getAccessToken", function() {
        it("should retrun a value equal to acessTokenDummy.", function () {
            expect(twitterUser.getAccessToken()).to.be.equal(accessTokenDummy);
        });
    });

    describe("#setAccessToken", function () {
        it("should return a reference to twitterUser", function () {
            expect(twitterUser.setAccessTokenSecret(accessTokenSecretDummy)).to.be.equal(twitterUser);
        });
    });

    describe("#getAccessToken", function() {
        it("should retrun a value equal to accessTokenSecretDummy.", function () {
            expect(twitterUser.getAccessTokenSecret()).to.be.equal(accessTokenSecretDummy);
        });
    });

});