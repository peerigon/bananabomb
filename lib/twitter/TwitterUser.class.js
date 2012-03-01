"use strict";

module.exports = function TwitterUser(twitterUserData) {
    
    var session,
        accessToken,
        accessTokenSecret,
        self = this;
    
    function __construct() {
        if (!__isTwitterUserData()) {
            throw new Error("You must pass a param twitterUserData on construct.");
        }
    }
    
    this.getId = function () {
        return twitterUserData.id;
    };
    
    this.getFriendsCount = function () {
        return twitterUserData.friends_count;
    };
    
    this.getScreenName = function () {
        return twitterUserData.screen_name;
    };
    
    this.getName = function () {
        return twitterUserData.name;
    };
    
    this.getFollowersCount = function () {
        return twitterUserData.followers_count;
    };    
    
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

    function __isTwitterUserData() {
        return (
            twitterUserData !== undefined &&
            twitterUserData.id !== undefined &&
            twitterUserData.friends_count !== undefined &&
            twitterUserData.screen_name !== undefined &&
            twitterUserData.name !== undefined &&
            twitterUserData.followers_count !== undefined
        );
    }
    
    __construct();
};