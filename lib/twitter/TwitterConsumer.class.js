"use strict";

module.exports = function TwitterConsumer(consumerKey, consumerSecret) {

    function __construct() {
        if(!consumerKey || !consumerSecret) {
            throw new Error("You must provide the apps consumer key and secret as parameter on construction.");
        }
    }

    this.getConsumerKey = function () {
        return consumerKey;
    };

    this.getConsumerSecret = function () {
        return consumerSecret;
    };

    __construct();
};