"use strict";

var expect          = require("expect.js"),
    SMTPSettings    = require("../lib/email/SMTPSettings.class"),
    smtpSettings,
    host,
    port,
    clientServerName,
    userName,
    password,
    maxConnections,
    service,
    useSecureConnection,
    isDebugMode;

describe("SMTPSettings", function () {

    describe("#__construct", function () {
        it("should be a SMTPSettings", function () {
            expect(new SMTPSettings()).to.be.a(SMTPSettings);
        });
    });

    before(function () {
        smtpSettings = new SMTPSettings();
        host = "smtp.servide.somewhere";
        port = 587;
        clientServerName = "DummySMTPServer";
        userName = "DummyUserName";
        password = "AVerySecretPassword";
        maxConnections = 5;
        service = "Gmail";
        useSecureConnection = true;
        isDebugMode = true;
    });

    describe("Setter", function () {
        describe("#setHost", function () {
            it("should return a reference to its instance", function () {
                expect(smtpSettings.setHost(host)).to.be.equal(smtpSettings);
            });
        });


        describe("#setPort", function () {
            it("should return a reference to its instance", function () {
                expect(smtpSettings.setPort(port)).to.be.equal(smtpSettings);
            });
        });


        describe("#setClientServerName", function () {
            it("should return a reference to its instance", function () {
                expect(smtpSettings.setClientServerName(clientServerName)).to.be.equal(smtpSettings);
            });
        });

        describe("#setUserName", function () {
            it("should return a reference to its instance", function () {
                expect(smtpSettings.setUserName(userName)).to.be.equal(smtpSettings);
            });
        });

        describe("#setPassword", function () {
            it("should return a reference to its instance", function () {
                expect(smtpSettings.setPassword(password)).to.be.equal(smtpSettings);
            });
        });

        describe("#enableSecureConnect", function () {
            it("should return a reference to its instance", function () {
                expect(smtpSettings.enableSecureConnection()).to.be.equal(smtpSettings);
            });
        });

        describe("#setMaxConnections", function () {
            it("should return a reference to its instance", function () {
                expect(smtpSettings.setMaxConnections(maxConnections)).to.be.equal(smtpSettings);
            });
        });

        /*
        describe("#autoConfigure", function () {
            it("should return a refrence to its instance", function () {
                expect(smtpSettings.autoConfigure("Gmail")).to.be.equal(smtpSettings);
            });
        });
        */

        describe("#enableDebugMode", function () {
            it("should return a reference to its instance", function () {
                expect(smtpSettings.enableDebugMode()).to.be.equal(smtpSettings);
            });
        });
    });

    describe("#toConfigObject", function () {
        it("should return an object with a eql structure", function () {
            expect(smtpSettings.toConfigObject()).to.be.eql({
                //"service": service,
                "host": host,
                "port": port,
                "secureConnection": useSecureConnection,
                "name": clientServerName,
                "auth": {
                    "user": userName,
                    "pass": password
                },
                "debug": isDebugMode,
                "maxConnections": maxConnections
            });
        });
    });

});
