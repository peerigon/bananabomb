"use strict";

var expect                      = require("expect.js"),
    httpsMock                   = require("./mocks/https.mock"),
    twitterDocuReference        = require("./mocks/twitterDocuReference.mock"),
    twitterGetTweetsReference   = require("./mocks/twitterGetTweetsReference.mock"),
    twitterPostTweetReference   = require("./mocks/twitterPostTweetReference.mock"),
    twitterDeleteTweetReference = require("./mocks/twitterDeleteTweetReference.mock"),
    twitterUserDataMock         = require("./mocks/twitterUserData.mock"),
    TwitterUser                 = require("../lib/twitter/TwitterUser.class"),
    TwitterConsumer             = require("../lib/twitter/TwitterConsumer.class"),
    OAuthTools                  = require("../lib/OAuthTools.class"),
    oAuthTools                  = new OAuthTools(),
    TwitterSignature            = require("../lib/twitter/TwitterSignature.class"),
    twitterSignature            = new TwitterSignature(oAuthTools),
    Twitter                     = require("../lib/twitter/Twitter.class"),
    success                     = function () { /*do nothing*/ },
    error                       = function () { /*error*/ };

describe("Twitter", function () {

    describe("Non-Twitter-API Tests", function () {

        var twitterUser,
            twitterConsumer,
            twitter;

        before(function () {
            twitterUser     = new TwitterUser(twitterUserDataMock);
            twitterUser
                .setAccessToken(twitterDocuReference.accessToken)
                .setAccessTokenSecret(twitterDocuReference.accessTokenSecret);
            twitterConsumer = new TwitterConsumer(twitterDocuReference.consumerKey, twitterDocuReference.consumerSecret);
        });

        describe("#__construct", function () {
            it("should throw an error without providing instances of TwitterUser, TwitterConsumer, TwitterSignature and OAuthsTools", function () {
                expect(function() { new Twitter(); }).to.throwException();
            });
            it("should be an instance of Twitter", function() {
                twitter = new Twitter(twitterUser, twitterConsumer, twitterSignature, oAuthTools, httpsMock);
                expect(twitter).to.be.a(Twitter);
            });
        });

        describe("#getSupportedAPIVersion", function() {
            it("should only support API-Version 1", function () {
                expect(twitter.getSupportedAPIVersion()).to.be.equal(1);
            });
        });
    });

    describe("Twitter-Documentation-Reference Test", function () {

        var httpsHeader,
            twitterUser,
            twitterConsumer,
            twitter;

        before(function () {
            twitterUser = new TwitterUser(twitterUserDataMock);
            twitterUser
                .setAccessToken(twitterDocuReference.accessToken)
                .setAccessTokenSecret(twitterDocuReference.accessTokenSecret);
            twitterConsumer = new TwitterConsumer(twitterDocuReference.consumerKey, twitterDocuReference.consumerSecret);
            oAuthTools.createTimestamp = function () {
                return twitterDocuReference.timestamp;
            };
            oAuthTools.createNonce = function () {
                return twitterDocuReference.oAuthParams.oauth_nonce;
            };
            twitter = new Twitter(twitterUser, twitterConsumer, twitterSignature, oAuthTools, httpsMock);
            twitter.postTweet(
                error,
                success,
                twitterDocuReference.postBody.status,
                twitterDocuReference.apiMethodParams
            );
            httpsHeader = httpsMock.requestOptions.headers;
        });

        describe("header comparison", function() {
            it("should be a value equal to the reference header value Accept", function () {
                expect(httpsHeader.Accept).to.be.equal(twitterDocuReference.header.Accept);
            });
            it("should be a value equal to the reference header value Connection", function() {
                expect(httpsHeader.Connection).to.be.equal(twitterDocuReference.header.Connection);
            });
            it("should be a value equal to the reference header value Content-Type", function() {
                expect(httpsHeader["Content-Type"]).to.be.equal(twitterDocuReference.header["Content-Type"]);
            });
            it("should be a value equal to the reference header value Content-Length", function() {
                expect(httpsHeader["Content-Length"]).to.be.equal(twitterDocuReference.header["Content-Length"]);
            });
            it("should be a value equal to the reference header value Authorization", function() {
                expect(httpsHeader.Authorization).to.be.equal(twitterDocuReference.header.Authorization);
            });
        });
    });

    describe("Twitter-API Tests", function () {

        describe("#getTweets", function () {
            var twitter,
                twitterUser,
                twitterConsumer,
                httpsHeader;

            before(function() {
                twitterUser = new TwitterUser(twitterUserDataMock);
                twitterUser
                    .setAccessToken(twitterGetTweetsReference.accessToken)
                    .setAccessTokenSecret(twitterGetTweetsReference.accessTokenSecret);
                twitterConsumer = new TwitterConsumer(twitterGetTweetsReference.consumerKey, twitterGetTweetsReference.consumerSecret);
                oAuthTools.createTimestamp = function () {
                    return twitterGetTweetsReference.timestamp;
                };
                oAuthTools.createNonce = function () {
                    return twitterGetTweetsReference.oAuthParams.oauth_nonce;
                };
                twitter = new Twitter(twitterUser, twitterConsumer, twitterSignature, oAuthTools, httpsMock);
                twitter.getTweets(
                    error,
                    success,
                    twitterGetTweetsReference.apiMethodParams
                );
                httpsHeader = httpsMock.requestOptions.headers;
            });

            describe("header comparison", function () {
                it("should be a value equal to the reference header Accept value", function () {
                    expect(httpsHeader.Accept).to.be.equal(twitterGetTweetsReference.header.Accept);
                });
                it("should be a value equal to the reference header value Connection", function() {
                    expect(httpsHeader.Connection).to.be.equal(twitterGetTweetsReference.header.Connection);
                });
                it("should be a value equal to the reference header value Content-Type", function() {
                    expect(httpsHeader["Content-Type"]).to.be.equal(twitterGetTweetsReference.header["Content-Type"]);
                });
                it("should be a value equal to the reference header value Authorization", function() {
                    expect(httpsHeader.Authorization).to.be.equal(twitterGetTweetsReference.header.Authorization);
                });
            });
        });

        describe("#postTweet", function () {

            var twitter,
                twitterUser,
                twitterConsumer,
                httpsHeader;

            before(function() {
                twitterUser = new TwitterUser(twitterUserDataMock);
                twitterUser
                    .setAccessToken(twitterPostTweetReference.accessToken)
                    .setAccessTokenSecret(twitterGetTweetsReference.accessTokenSecret);
                twitterConsumer = new TwitterConsumer(twitterPostTweetReference.consumerKey, twitterPostTweetReference.consumerSecret);
                oAuthTools.createTimestamp = function () {
                    return twitterPostTweetReference.timestamp;
                };
                oAuthTools.createNonce = function () {
                    return twitterPostTweetReference.oAuthParams.oauth_nonce;
                };
                twitter = new Twitter(twitterUser, twitterConsumer, twitterSignature, oAuthTools, httpsMock);
                twitter.postTweet(
                    error,
                    success,
                    twitterPostTweetReference.postBody.status,
                    twitterPostTweetReference.apiMethodParams
                );
                httpsHeader = httpsMock.requestOptions.headers;
            });

            describe("header comparison", function () {
                it("should be a value equal to the reference header value Accept", function () {
                    expect(httpsHeader.Accept).to.be.equal(twitterPostTweetReference.header.Accept);
                });
                it("should be a value equal to the reference header value Connection", function() {
                    expect(httpsHeader.Connection).to.be.equal(twitterPostTweetReference.header.Connection);
                });
                it("should be a value equal to the reference header value Content-Type", function() {
                    expect(httpsHeader["Content-Type"]).to.be.equal(twitterPostTweetReference.header["Content-Type"]);
                });
                it("should be a value equal to the reference header value Authorization", function() {
                    expect(httpsHeader.Authorization).to.be.equal(twitterPostTweetReference.header.Authorization);
                });
            });


            describe("#deleteTweet", function () {

                var twitter,
                    twitterUser,
                    twitterConsumer,
                    httpsHeader;

                before(function() {
                    twitterUser = new TwitterUser(twitterUserDataMock);
                    twitterUser
                        .setAccessToken(twitterDeleteTweetReference.accessToken)
                        .setAccessTokenSecret(twitterDeleteTweetReference.accessTokenSecret);
                    twitterConsumer = new TwitterConsumer(twitterDeleteTweetReference.consumerKey, twitterDeleteTweetReference.consumerSecret);
                    oAuthTools.createTimestamp = function () {
                        return twitterDeleteTweetReference.timestamp;
                    };
                    oAuthTools.createNonce = function () {
                        return twitterDeleteTweetReference.oAuthParams.oauth_nonce;
                    };
                    twitter = new Twitter(twitterUser, twitterConsumer, twitterSignature, oAuthTools, httpsMock);

                });

                describe("Error handling", function () {
                    it("should throw an exception if tweetId is a Number", function () {
                        expect(function() {
                            twitter.deleteTweet(error, success, 174116712923406336);
                        }).to.throwException();
                    });
                });

                before(function () {
                    twitter.deleteTweet(error, success, twitterDeleteTweetReference.tweetId);
                    httpsHeader = httpsMock.requestOptions.headers;
                });
                describe("header comparison", function () {
                    it("should be a value equal to the reference header value Accept", function () {
                        expect(httpsHeader.Accept).to.be.equal(twitterDeleteTweetReference.header.Accept);
                    });
                    it("should be a value equal to the reference header value Connection", function() {
                        expect(httpsHeader.Connection).to.be.equal(twitterDeleteTweetReference.header.Connection);
                    });
                    it("should be a value equal to the reference header value Content-Type", function() {
                        expect(httpsHeader["Content-Type"]).to.be.equal(twitterPostTweetReference.header["Content-Type"]);
                    });
                    it("should be a value equal to the reference header value Authorization", function() {
                        expect(httpsHeader.Authorization).to.be.equal(twitterDeleteTweetReference.header.Authorization);
                    });
                });
            });
        });
    });
});