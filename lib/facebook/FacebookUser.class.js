"use strict";


module.exports = function FacebookUser(facebookUserData) {
    
    var session,
        accessToken,
        accessTokExtra,
        self = this;
        
    function __construct() {
        if (!__isFacebookUserData()) {
            throw new Error("You must pass a param facebookUserData on construct");
        }
    }
    
    function __isFacebookUserData() {
        return (
            facebookUserData !== undefined &&
            facebookUserData.id !== undefined 
        );
    }
    
    this.getId = function () {
        return facebookUserData.id;
    };

    this.setSession = function (newSession) {
        session = newSession;
        return self;
    };
    
    this.getSession = function () {
        return session;
    };
    
    this.setAccessToken = function (newAccessToken) {
        accessToken = newAccessToken;
        return this;
    };
    
    this.getAccessToken = function () {
        return accessToken;
    };
    
    this.setAccessTokExtra = function (newAccessTokExtra) {
        accessTokExtra = newAccessTokExtra;
        return this;
    };
    
    this.getAccessTokExtra = function () {
        return accessTokExtra;
    };
    
    __construct();
}