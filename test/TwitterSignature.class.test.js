"use strict";

var expect                      = require("expect.js"),
    _                           = require("underscore"),
    twitterDocuReference        = require("./mocks/twitterDocuReference.mock"),
    twitterDeleteTweetReference = require("./mocks/twitterDeleteTweetReference.mock"),
    TwitterSignature            = require("../lib/twitter/TwitterSignature.class");

describe("TwitterSignature", function () {

    describe("#__construct", function () {
        it("should be an instance of TwitterSignature", function () {
            expect(new TwitterSignature()).to.be.an(TwitterSignature);
        });
    });

    describe("Twitter-Documentation Test", function () {

        var twitterSignature;

        before(function () {
            twitterSignature = new TwitterSignature();
        });

        describe("#createSigningKey", function () {
            it("should return a value equal to referenceSignatureKey", function () {
                expect(
                    twitterSignature.createSigningKey(twitterDocuReference.consumerSecret, twitterDocuReference.accessTokenSecret)
                ).to.be.equal(twitterDocuReference.signingKey);
            });
        });

        describe("#createSignatureBase", function () {
            it("should return a value equal to referenceSignatureBase", function () {
                var signatureBase = twitterSignature.createSignatureBase(
                    twitterDocuReference.httpMethod,
                    twitterDocuReference.baseURL,
                    twitterDocuReference.apiMethod,
                    _.extend(
                        {},
                        twitterDocuReference.apiMethodParams,
                        twitterDocuReference.oAuthParams,
                        twitterDocuReference.postBodyURIEncoded
                    )
                );
                expect(signatureBase).to.be.equal(twitterDocuReference.signatureBase);
            });
        });

        describe("#createSignature", function () {
            it("should return a value equal to to referenceSignature", function () {
                var signature = twitterSignature.createSignature(twitterDocuReference.signingKey, twitterDocuReference.signatureBase);
                expect(signature).to.be.equal(twitterDocuReference.signature);
            });
        });
    });

    describe("Twitter-API deleteTweet", function () {

        var twitterSignature;

        before(function () {
            twitterSignature = new TwitterSignature();
        });

        describe("#createSigningKey", function () {
            it("should return a value equal to referenceSignatureKey", function () {
                var signingKey = twitterSignature.createSigningKey(
                    twitterDeleteTweetReference.consumerSecret,
                    twitterDeleteTweetReference.accessTokenSecret
                );
                expect(signingKey).to.be.equal(twitterDeleteTweetReference.signingKey);
            });
        });

        describe("#createSignatureBase", function () {
            it("should return a value equal to referenceSignatureBase", function () {
                var signatureBase = twitterSignature.createSignatureBase(
                    twitterDeleteTweetReference.httpMethod,
                    twitterDeleteTweetReference.baseURL,
                    twitterDeleteTweetReference.apiMethod,
                    _.extend(
                        {},
                        twitterDeleteTweetReference.apiMethodParams,
                        twitterDeleteTweetReference.oAuthParams
                    )
                );
                expect(signatureBase).to.be.equal(twitterDeleteTweetReference.signatureBase);
            });
        });

        describe("#createSignature", function () {
            it("should return a value equal to to referenceSignature", function () {
                var signature = twitterSignature.createSignature(
                    twitterDeleteTweetReference.signingKey,
                    twitterDeleteTweetReference.signatureBase
                );
                expect(signature).to.be.equal(twitterDeleteTweetReference.signature);
            });
        });
    });
});