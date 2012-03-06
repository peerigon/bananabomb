"use strict";

var expect              = require("expect.js"),
    everyauthMock       = require("./mocks/everyauth.facebook.mock.js"),
    FacebookConsumer    = require("../lib/facebook/FacebookConsumer.class.js"),
    facebookConsumer    = new FacebookConsumer(543256432, "asdf8w9w2fhdsjfaahk2r3wfsafkdsak"),
    FacebookEveryauth   = require("../lib/facebook/FacebookEveryauth.class.js"),
    facebookEveryauth;
    
    
describe("FacebookEveryauth", function () {
    describe("#__construct", function () {
        it("should throw an exception.", function () {
            expect(function () {
                new FacebookEveryauth();
            }).to.throwException();
            expect(function () {
                new FacebookEveryauth(facebookEveryauth, undefined);
            }).to.throwException();
            expect(function () {
                new FacebookEveryauth(undefined, facebookConsumer);
            }).to.throwException();
        })
        it("should be an instance of FacebookEveryauth", function() {
            expect(new FacebookEveryauth(everyauthMock, facebookConsumer)).to.be.a(FacebookEveryauth);
        })
    })
    
    facebookEveryauth = new FacebookEveryauth(everyauthMock, facebookConsumer);
    it("should be equal '/'", function () {
        expect(facebookEveryauth.getRedirectPath()).to.be.equal("/");
    })
    
    var redirectPath = "/bananabombcanon";
    describe("#setRedirectPath", function () {
        it("should return a reference to the facebookEveryauth instance.", function () {
            expect(facebookEveryauth.setRedirectPath(redirectPath)).to.be.equal(facebookEveryauth);
        });
        it("should be equal to " + redirectPath + ".", function () {
            expect(facebookEveryauth.getRedirectPath()).to.be.equal(redirectPath);
        });
    })
    
    describe("#getMiddleware", function () {
        it("should be a function", function () {
            expect(facebookEveryauth.getMiddleware).to.be.a(Function)
        });
    });
    
    describe("#__configure & #__findOrCreateUser", function () {
        var tmpFacebookEveryauth,
            tmpSession = everyauthMock.facebook.findOrCreateUserCallbackParams.session;

        describe("On 'data.", function () {
            before(function () {
                tmpFacebookEveryauth = new FacebookEveryauth(everyauthMock, facebookConsumer);
            });
            it("should pass on 'data' the following params: session, accessToken, accessTokExtra, facebookUserData.", function (done) {
                tmpFacebookEveryauth.on("data", function(session, accessToken, accessTokExtra, facebookUserData) {
                    expect(session).to.be.equal(everyauthMock.facebook.findOrCreateUserCallbackParams.session);
                    expect(accessToken).to.be.equal(everyauthMock.facebook.findOrCreateUserCallbackParams.accessToken);
                    expect(accessTokExtra).to.be.equal(everyauthMock.facebook.findOrCreateUserCallbackParams.accessTokExtra);
                    expect(facebookUserData).to.be.equal(everyauthMock.facebook.findOrCreateUserCallbackParams.facebookUserData);
                    done();
                });
                tmpFacebookEveryauth.getMiddleware();
            });
            after(function (){
                tmpFacebookEveryauth = undefined;
            });
        });
        describe("On 'error'", function () {
            before(function () {
                everyauthMock.facebook.findOrCreateUserCallbackParams.session = undefined;
                tmpFacebookEveryauth = new FacebookEveryauth(everyauthMock, facebookConsumer);
            });
            it("should throw an 'error'-event", function (done) {
                tmpFacebookEveryauth.on('error', function () {
                    done();
                });
                tmpFacebookEveryauth.getMiddleware();
            });
            after(function () {
                everyauthMock.facebook.findOrCreateUserCallbackParams.session = tmpSession;
            });
        });
    });
    
})