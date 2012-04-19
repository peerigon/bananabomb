"use strict";

var _                       = require("underscore"),
    expect                  = require("expect.js"),

    Facebook                = require("../lib/facebook/FacebookGraphAPI.class"),

    facebookDocuReference   = require("./mocks/facebookDocuReference.mock"),
    facebookUserDataMock    = require("./mocks/facebookUserData.mock"),
    httpsMock               = require("./mocks/https.mock"),
    error                   = function () { /* error */ },
    success                 = function () { /* do nothing */ },
    facebookUserID          = facebookUserDataMock.id,
    facebookUserAccessToken = facebookUserDataMock.AccessToken;


describe("Facebook", function () {
//    
//    describe("Non-Facebook-API Tests", function () {
//        
//        var facebookUser,
//            facebookConsumer,
//            facebook;
//            
//        before(function () {
//            facebookUser    = new FacebookUser(facebookUserDataMock);
//            facebookUser
//                .setAccessToken(facebookDocuReference.accessToken)
//                .setAccessTokExtra(facebookDocuReference.accessTokExtra);
//            facebookConsumer = new FacebookConsumer(facebookDocuReference.appId, facebookDocuReference.appSecret);
//            
//        });
//
//        describe("#__construct", function () {
//            it("should throw an error without providing instances of FacebookUser, FacebookConsumer", function () {
//                expect(function() {new Facebook();}).to.throwException();
//            });
//        
//            it("should be an instance of Facebook", function () {
//                facebook = new Facebook(FacebookUser, FacebookConsumer);
//                expect(facebook).to.be.a(Facebook);
//            });
//        });
//        
//    });
//    
//    
    describe("Facebook-API Test", function () {
        
        describe("#getStatuses", function () {
            
            var facebook;
                
            before(function() {

                facebook = new Facebook(facebookUserID, facebookUserAccessToken, httpsMock);
                facebook.getStatuses(
                    error,
                    success
                );
                
            });
        });
        
        
        describe("#postStatus", function () {
            
            var facebook;
                
            before(function () {
 
                facebook = new Facebook(facebookUserID, facebookUserAccessToken, httpsMock);
                facebook.postStatus(
                    error,
                    success,
                    facebookDocuReference.status.status
                );
                    
            });
        });
        
        describe("#deleteStatus", function () {
            
            var facebook;
                
            before(function () {

                facebook = new Facebook(facebookUserID, facebookUserAccessToken, httpsMock);
                facebook.deleteStatus(
                    error,
                    success,
                    facebookDocuReference.status.statusId)
            });
                        
//            describe("Error handling", function () {
//                it("should throw an exception if statusId is a String", function () {
//                    expect(function () {
//                        facebook.deleteStatus(error, success, "gldglksdfgsd");
//                    }).to.throwException();
//                });
//            });
            
        });       
    });
});