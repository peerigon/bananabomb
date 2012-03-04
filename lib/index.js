"use strict";

var /**
     * @type {node.util}
     */
    util                = require("util"),
    /**
     * @type {node.events.EventEmitter}
     */
    EventEmitter        = require("events").EventEmitter,
    /**
     * @type {lib.twitter.TwitterSignature}
     */
    signaturInstance,
    /**
     * @type {js.JSON}
     */
    modules;

/**
 * @return {lib.twitter.oAuthTools}
 */
function oAuthTools() {
    return require("./oAuthTools");
}

/**
 * @return {lib.twitter.TwitterSignature}
 */
function Signature() {
    if (signaturInstance === undefined) {
        var TwitterSignature = require("./twitter/TwitterSignature.class");
        signaturInstance = new TwitterSignature(oAuthTools());
    }
    return signaturInstance;
}

/**
 * Makes it possible that twitter.Everyauth is an EventEmitter.
 * (TwitterEveryauth inherits from EventEmitter. EventEmitter is a protoype style written object. Because of this
 * it seems that there is no better way than this init-Method() at the moment.)
 */
function init() {
    util.inherits(modules.twitter.Everyauth, EventEmitter);
    module.exports = modules;
}

modules = {
    twitter: {
        /**
         * A simple representation of your consumer or rather your app.
         *
         * @param {js.String} consumerKey
         * @param {js.String} consumerSecret
         */
        Consumer:       function (consumerKey, consumerSecret) {
            var TwitterConsumer = require("./twitter/TwitterConsumer.class");

            TwitterConsumer.call(this, consumerKey, consumerSecret);
        },
        /**
         * A wrapper that makes the use of everyauth easier.
         * @see https://github.com/bnoguchi/everyauth for further documentation.
         *
         * @param everyauth
         * @param {twitter.Consumer} twitterConsumer
         */
        Everyauth:      function (everyauth, twitterConsumer) {
            var Everyauth =  require("./twitter/TwitterEveryauth.class");

            Everyauth.call(this, everyauth, twitterConsumer);
        },
        /**
         * Provides some methods to work on the Twitter-REST-API.
         *
         * @param {twitter.User} twitterUser
         * @param {twitter.Consumer}twitterConsumer
         */
        RESTClient:     function (twitterUser, twitterConsumer) {
            var TwitterRESTClient = require("./twitter/TwitterRESTClient.class.js");

            TwitterRESTClient.call(this, twitterUser, twitterConsumer, Signature(), oAuthTools(), require("https"));
        },
        /**
         * A simple representation of the user in the name of your application is tweeting.
         *
         * @param {js.JSON} twitterUserData
         */
        User:           function (twitterUserData) {
            var TwitterUser = require("./twitter/TwitterUser.class");

            TwitterUser.call(this, twitterUserData);
        }
    }
};

init();