"use strict"; // run code in ES5 strict mode

var expect                  = require("expect.js"),
    _                       = require("underscore"),
    oAuthTools              = require("../lib/oAuthTools"),
    twitterData             = require("./mocks/twitterDocuReference.mock");

describe("OAuthTools", function () {

    describe("#encodeURIComponent", function () {
        it("should be a equal value to encodedURIComponent", function () {
            expect(
                oAuthTools.encodeURIComponent(twitterData.postBody.status)
            ).to.be.equal(twitterData.postBodyURIEncoded.status);
        });
    });

    describe("#decodeURIComponent", function () {
        it("should be a equal value to decodedURIComponent", function () {
            expect(
                oAuthTools.decodeURIComponent(twitterData.postBodyURIEncoded.status)
            ).to.be.equal(twitterData.postBody.status);
        });
    });

    describe("#createHMACSignature", function () {
        it("should be a equal value to referenceSignature", function() {
            var signature = oAuthTools.createHMACSignature(
                "sha1",
                twitterData.signingKey,
                twitterData.signatureBase,
                "base64"
            );
            expect(signature).to.be.equal(twitterData.signature);
        });
    });

    describe("#createNonce", function() {
        it("should always retun a different string which is alphanumeric.", function() {
            var nonce,
                tmpNonce,
                i;

            for (i = 0; i < 10; ++i) {
                tmpNonce = oAuthTools.createNonce(32);
                expect(tmpNonce).not.to.be.equal(nonce);
                nonce = tmpNonce;
                expect(nonce).to.match(/[A-Z]/);
                expect(nonce).to.match(/[a-z]/);
                expect(nonce).to.match(/[0-9]/);
            }
        });

        it("should be exactly 59 chars long", function () {
            expect(oAuthTools.createNonce(59)).to.have.length(59);
        });
    });

    describe("#sortParams", function() {
        var sortetParamKeys             = _.keys(oAuthTools.sortParams({
                "apple" : "a", "lemon": "l", "banana": "b", "pear": "p", "granate_apple": "g_a"
            })),
            sortetParamKeysReference    = _.keys({
                "apple" : "a", "banana": "b", "granate_apple": "g_a", "lemon": "l", "pear": "p"
            });
        it("should return an object with same property order as sortetParams", function() {
            _.each(sortetParamKeys, function(index) {
                expect(sortetParamKeys[index]).to.be.equal(sortetParamKeysReference[index]);
            });
        });
    });

    describe("#joinParams", function () {
        it("should return a string equal to joinedParams", function() {
            var params = {
                "include_entities":     true,
                "oauth_consumer_key":   "xvz1evFS4wEEPTGEFPHBog"
            },
            joinedParams = "include_entities=true&oauth_consumer_key=xvz1evFS4wEEPTGEFPHBog";
            expect(oAuthTools.joinParams(params, "&")).to.be.equal(joinedParams);
        });
        it("should return a string equal to joinedParams", function() {
            var params = {
                "include_entities":     true,
                "oauth_consumer_key":   "xvz1evFS4wEEPTGEFPHBog"
            },
            joinedParams = 'include_entities="true",oauth_consumer_key="xvz1evFS4wEEPTGEFPHBog"';
            expect(oAuthTools.joinParams(params, ",", true)).to.be.equal(joinedParams);
        });
        it("shoudl return a empty string.", function () {
            var params = {};
            expect(oAuthTools.joinParams(params, ",", true)).to.be.equal("");
        });
    });
});