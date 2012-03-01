"use strict"; // run code in ES5 strict mode

var expect = require("expect.js"),
    TwitterConsumer = require("../app/lib/twitter/TwitterConsumer.class.js"),
    twitterConsumer,
    consumerKeyDummy = "abcdefghijklamn",
    consumerSecretDummy = "abcdefghijklamnabcdefghijklamn";

describe("TwitterConsumer", function () {

    describe("#__construct", function () {
        it("should throw an Exception if no or only paramter is given.", function () {
            expect(function () {
                new TwitterConsumer();
            }).to.throwException();
            expect(function () {
                new TwitterConsumer(consumerKeyDummy, undefined);
            }).to.throwException();
            expect(function () {
                new TwitterConsumer(undefined, consumerSecretDummy);
            }).to.throwException();
        });
        it("should be an instance of TwitterConsumer.", function () {
            expect(new TwitterConsumer(consumerKeyDummy, consumerSecretDummy)).to.be.a(TwitterConsumer);
        });
    });

    twitterConsumer = new TwitterConsumer(consumerKeyDummy, consumerSecretDummy);
    describe("#getConsumerKey", function () {
        it("should be a value equal to consumerKeyDummy.", function () {
            expect(twitterConsumer.getConsumerKey()).to.be.equal(consumerKeyDummy);
        });
    });

    describe("#getConsumerKeySecret", function () {
        it("shoudl be a value equal to consumerSecretDummy.", function () {
            expect(twitterConsumer.getConsumerSecret()).to.be.equal(consumerSecretDummy);
        });
    });
});