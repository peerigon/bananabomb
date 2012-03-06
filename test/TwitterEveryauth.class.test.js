var expect              = require("expect.js"),
    everyauthMock       = require("./mocks/everyauth.twitter.mock.js"),
    TwitterConsumer     = require("../lib/twitter/TwitterConsumer.class.js"),
    twitterConsumer     = new TwitterConsumer("cOnSuMeRKeYDuMMy", "cOnSuMeRkEYdUmmYcOnSuMeRkEYdUmmY"),
    TwitterEveryauth    = require("../lib/twitter/TwitterEveryauth.class.js"),
    twitterEveryauth;

describe("TwitterEveryauth", function () {
    describe("#__construct", function () {
        it("should throw an exception.", function () {
            expect(function () {
                new TwitterEveryauth();
            }).to.throwException();
            expect(function () {
                new TwitterEveryauth(twitterEveryauth, undefined);
            }).to.throwException();
            expect(function () {
                new TwitterEveryauth(undefined, twitterConsumer);
            }).to.throwException();
        });
        it("should be an instance of TwitterEveryauth", function () {
            expect(new TwitterEveryauth(everyauthMock, twitterConsumer)).to.be.a(TwitterEveryauth);
        });
    });

    twitterEveryauth = new TwitterEveryauth(everyauthMock, twitterConsumer);
    describe("#getRedirectPath", function () {
        it("should be equal '/'", function () {
            expect(twitterEveryauth.getRedirectPath()).to.be.equal("/");
        });
    });

    var redirectPath = "/bananabombcanon";
    describe("#setRedirectPath", function () {
        it("should return a reference to the twitterEveryauth instance.", function () {
            expect(twitterEveryauth.setRedirectPath(redirectPath)).to.be.equal(twitterEveryauth);
        });
        it("should be equal to " + redirectPath + ".", function () {
            expect(twitterEveryauth.getRedirectPath()).to.be.equal(redirectPath);
        });
    });

    describe("#getMiddleware", function () {
        it("should be a function", function() {
            expect(twitterEveryauth.getMiddleware).to.be.a(Function);
        });
    });

    describe("#__configure & #__findOrCreateUser", function () {
        var tmpTwitterEveryauth,
            tmpSession = everyauthMock.twitter.findOrCreateUserCallbackParams.session;

        describe("On 'data.", function () {
            before(function () {
                tmpTwitterEveryauth = new TwitterEveryauth(everyauthMock, twitterConsumer);
            });
            it("should pass on 'data' the following params: session, accessToken, accessTokenSecret, twitterUserData.", function (done) {
                tmpTwitterEveryauth.on("data", function(session, accessToken, accessTokenSecret, twitterUserData) {
                    expect(session).to.be.equal(everyauthMock.twitter.findOrCreateUserCallbackParams.session);
                    expect(accessToken).to.be.equal(everyauthMock.twitter.findOrCreateUserCallbackParams.accessToken);
                    expect(accessTokenSecret).to.be.equal(everyauthMock.twitter.findOrCreateUserCallbackParams.accessTokenSecret);
                    expect(twitterUserData).to.be.equal(everyauthMock.twitter.findOrCreateUserCallbackParams.twitterUserData);
                    done();
                });
                tmpTwitterEveryauth.getMiddleware();
            });
            after(function (){
                tmpTwitterEveryauth = undefined;
            });
        });
        describe("On 'error'", function () {
            before(function () {
                everyauthMock.twitter.findOrCreateUserCallbackParams.session = undefined;
                tmpTwitterEveryauth = new TwitterEveryauth(everyauthMock, twitterConsumer);
            });
            it("should throw an 'error'-event", function (done) {
                tmpTwitterEveryauth.on('error', function () {
                    done();
                });
                tmpTwitterEveryauth.getMiddleware();
            });
            after(function () {
                everyauthMock.twitter.findOrCreateUserCallbackParams.session = tmpSession;
            });
        });
    });
});