"use strict";

var EventEmitter    = require("events").EventEmitter,
    util            = require("util");
    
    
function FacebookEveryauth(everyauth, facebookConsumer) {
    EventEmitter.call(this);
    
    var redPath,
        self = this;
        
    function __construct() {
        if (!everyauth || !facebookConsumer) {
            throw new Error("You must provide all parameters: everyauth(everyauth), appId, appSecret.");
        }
        redPath = "/";
    }
    
    this.getRedirectPath = function () {
        return redPath;
    }
    
    this.setRedirectPath = function (path) {
        redPath = path;
        return this;
    }
    
    this.getMiddleware = function () {
        __configure();
        return everyauth.middleware();
    }
    
    function __configure() {

        everyauth.facebook
            .appId(facebookConsumer.getAppId())
            .appSecret(facebookConsumer.getAppSecret())
            .findOrCreateUser(__findOrCreateUser)
            .redirectPath(self.getRedirectPath());
    }
    
    function __findOrCreateUser(session, accessToken, accessTokExtra, facebookUserData) {
        if (session && accessToken && accessTokExtra && facebookUserData) {
            self.emit("data", session, accessToken, accessTokExtra, facebookUserData);
        } else {
            self.emit("error");
        }

        return facebookUserData;
    }
        
    
    __construct();
}

util.inherits(FacebookEveryauth, EventEmitter);

module.exports = FacebookEveryauth;