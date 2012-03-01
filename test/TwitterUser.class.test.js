"use strict";

var expect                  = require("expect.js"),
    TwitterUser             = require("../lib/twitter/TwitterUser.class.js"),
    twitterUser,
    twitterUserDataMock     = require("./mocks/twitterUserData.mock.js"),
    everyauthMock           = require("./mocks/everyauth.mock.js"),
    sessionDummy            = everyauthMock.twitter.findOrCreateUserCallbackParams.session,
    accessTokenDummy        = everyauthMock.twitter.findOrCreateUserCallbackParams.accessToken,
    accessTokenSecretDummy  = everyauthMock.twitter.findOrCreateUserCallbackParams.accessTokenSecret;

describe("TwitterUser", function () {

    describe("#__construct & #__isTwitterUserData", function () {
        it("should throw an error without giving twitterUserData", function () {
            expect(function () {
                new TwitterUser();
            }).to.throwException();
        });
        it("should throw an error giving any object", function () {
            expect(function () {
                new TwitterUser({});
            }).to.throwException();
        });
        it("should be an instance of TwitterUser", function () {
            expect(new TwitterUser(twitterUserDataMock)).to.be.a(TwitterUser);
        });
    });

    twitterUser = new TwitterUser(twitterUserDataMock);
    describe("#getId", function () {
        it("should return an equal id to twitterUserDataMock.id", function () {
            expect(twitterUser.getId()).to.be.equal(twitterUserDataMock.id);
        });
    });

    describe("#getFriendsCount", function () {
        it("should return a count equal to twitterUserDataMock.friends_count.", function () {
            expect(twitterUser.getFriendsCount()).to.be.equal(twitterUserDataMock.friends_count);
        });
    });

    describe("#getScreenName", function () {
        it("should return a screenname equal to twitterUserDataMock.screen_name", function () {
            expect(twitterUser.getScreenName()).to.be.equal(twitterUserDataMock.screen_name);
        });
    });

    describe("#getName", function () {
        it("should return a name equal to twitterUserDataMock.name", function () {
            expect(twitterUser.getName()).to.be.equal(twitterUserDataMock.name);
        });
    });

    describe("#getFollowersCount", function () {
        it("should return a count equal to twitterUserDataMock.followers_count.", function () {
            expect(twitterUser.getFollowersCount()).to.be.equal(twitterUserDataMock.followers_count);
        });
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