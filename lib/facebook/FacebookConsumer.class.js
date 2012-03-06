"use strict";

module.exports = function FacebookConsumer(appId, appSecret) {
    
    function __construct() {
        if(!appId || !appSecret) {
            throw new Error("You must provide the appId and the appSecret as parameter on cunstruction.");
        }
    }
    
    this.getAppId = function () {
        return appId;
    }
    
    this.getAppSecret = function () {
        return appSecret;
    }
    
    __construct();
    
};



//module.exports = FacebookConsumer;