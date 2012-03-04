"use strict";

var EventEmitter    = require("events").EventEmitter,
    util            = require("util");

/**
 * @param everyauth
 * @param {lib.twitter.TwitterConsumer} twitterConsumer
 */
function TwitterEveryauth(everyauth, twitterConsumer) {
    EventEmitter.call(this);

    var /**
         * @private
         * @type {js.String}
         */
        redPath,
        /**
         * @praivte
         * @type {lib.twitter.TwitterEveryauth
         */
        self = this;

    function __construct() {
        if (!everyauth || !twitterConsumer) {
            throw new Error("You must provide all paramters: everyauth(everyauth), consumerKey(String), consumerSecret(String)");
        }
        redPath = "/";
    }

    /**
     * @return {js.String}
     */
    this.getRedirectPath = function () {
        return redPath;
    };

    /**
     * @param {js.String} path
     *
     * @return {lib.twitter.TwitterEveryauth}
     */
    this.setRedirectPath = function (path) {
        redPath = path;
        return this;
    };

    /**
     * Returns a configured middleware for express or connect.
     *
     * @return {js.Function}
     */
    this.getMiddleware = function () {
        __configure();
        return everyauth.middleware();
    };

    function __configure() {
        everyauth.twitter
            .consumerKey(twitterConsumer.getConsumerKey())
            .consumerSecret(twitterConsumer.getConsumerSecret())
            .findOrCreateUser(__findOrCreateUser)
            .redirectPath(self.getRedirectPath());
    }

    /**
     * @param {js.String} session
     * @param {js.String} accessToken
     * @param {js.String} accessTokenSecret
     * @param {js.String} twitterUserData
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