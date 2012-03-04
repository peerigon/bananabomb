"use strict";

var expect          = require("expect.js"),
    SMTPSettings    = require("../lib/email/SMTPSettings.class"),
    smtpSettings,
    host,
    port,
    name;

describe("SMTPSettings", function () {

    describe("#__construct", function () {
        it("should be a SMTPSettings", function () {
            expect(new SMTPSettings()).to.be.a(SMTPSettings);
        });
    });

    describe("Getters & Setters", function () {

        before(function () {
            smtpSettings    = new SMTPSettings();
            host            = "smtp.servide.somewhre";
            port            = 587;
            name            = "DummySMTPServer";
        });

        describe("#setHost", function () {
            it("should return a reference to its instance", function () {
                expect(smtpSettings.setHost(host)).to.be.equal(smtpSettings);
            });
        });

        describe("#getHost", function () {
            it("should retrun a equal value to " + host, function () {
                expect(smtpSettings.getHost()).to.be.equal(host);
            });
        });

        describe("#setPort", function () {
            it("should return a reference to its instance", function () {
                expect(smtpSettings.setPort(port)).to.be.equal(smtpSettings);
            });
        });

        describe("#getPort", function () {
            it("should be a equal valu to " + port, function () {
                expect(smtpSettings.getPort()).to.be.equal(port);
            });
        });

        describe("#setName", function () {
            it("should return a reference to its instance", function () {
                expect(smtpSettings.setName(name)).to.be.equal(smtpSettings);
            });
        });

        describe("#getName", function () {
            it("should be a equal valu to " + name, function () {
                expect(smtpSettings.getName()).to.be.equal(name);
            });
        });
    });
});
