"use strict";

/**
 * @param {Object} twitterUserData
 */
module.exports = function TwitterUser() {
    
    var session,
        accessToken,
        accessTokenSecret,
        self = this;
    
    function __construct() {
    }
    
    this.setSession = function(newSession) {
        session = newSession;
        return self;
    };
    
    this.getSession = function() {
        return session;
    };
    
    this.setAccessToken = function (newAccessToken) {
        accessToken = newAccessToken;
        return self;
    };
    
    this.getAccessToken = function () {
        return accessToken;
    };
    
    this.setAccessTokenSecret = function (newAccessTokenSecret) {
        accessTokenSecret = newAccessTokenSecret;
        return self;
    };
    
    this.getAccessTokenSecret = function () {
        return accessTokenSecret;
    };
    
    __construct();
};