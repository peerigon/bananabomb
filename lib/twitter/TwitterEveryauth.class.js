"use strict";

var EventEmitter = require("events").EventEmitter,
    util = require("util");

function TwitterEveryauth(everyauth, twitterConsumer) {

    EventEmitter.call(this);

    var eAuth,
        redPath,
        consumer,
        self = this;

    function __construct() {
        if (!everyauth || !twitterConsumer) {
            throw new Error("You must provide all paramters: everyauth(everyauth), consumerKey(String), consumerSecret(String)");
        }
        eAuth = everyauth;
        consumer = twitterConsumer;
        redPath = "/";
    }

    this.getRedirectPath = function () {
        return redPath;
    };

    this.setRedirectPath = function (path) {
        redPath = path;
        return this;
    };

    this.getMiddleware = function () {
        __configure();
        return everyauth.middleware();
    };

    function __configure() {
        everyauth.twitter
            .consumerKey(consumer.getConsumerKey())
            .consumerSecret(consumer.getConsumerSecret())
            .findOrCreateUser(__findOrCreateUser)
            .redirectPath(self.getRedirectPath());
    }

    /**
     * @param session
     * @param accessToken
     * @param accessTokenSecret
     * @param twitterUserData
     */
    function __findOrCreateUser(session, accessToken, accessTokenSecret, twitterUserData) {
        if (session && accessToken && accessTokenSecret && twitterUserData) {
            self.emit("data", session, accessToken, accessTokenSecret, twitterUserData);
        } else {
            self.emit("error");
        }
        return twitterUserData;
    }

    __construct();
}

util.inherits(TwitterEveryauth, EventEmitter);

module.exports = TwitterEveryauth;