"use strict";

var _ = require("underscore"),
    expect = require("expect.js"),
    nodemailerMock = require("./mocks/nodemailer.mock.js"),
    SMTPClient = require("../lib/email/SMTPClient.class.js"),
    smtpClient,
    SMTPSettings = require("../lib/email/SMTPSettings.class.js"),
    smtpSettings,
    EMail = require("../lib/email/EMail.class.js"),
    eMail,
    referenceProtocol,
    emailAddress,
    emailAddresses,
    onSendAll;

describe("SMTPClient", function () {

    before(function () {
        smtpSettings = new SMTPSettings();
        eMail = new EMail();
    });

    describe("#__construct", function () {
        it("should throw an exception", function () {
            expect(function () {
                new SMTPClient();
            }).to.throwException();
        });

        it("should be a SMTPClient", function () {
            expect(
                new SMTPClient(smtpSettings, eMail)
            ).to.be.a(SMTPClient);
        })
    });

    before(function () {
        smtpClient = new SMTPClient(smtpSettings, eMail, nodemailerMock);
        referenceProtocol = "SMTP";
        emailAddress = "one@one.com";
        emailAddresses = [emailAddress, "two@two.com", "three@three.com"];
        onSendAll = function () { /* Do nothing */};
    });

    describe("#openSocket", function () {
        it("should return a reference to its instance", function () {
            expect(smtpClient.openSocket()).to.be.equal(smtpClient);
        });
        it("should be a equal value to " + referenceProtocol, function () {
            expect(nodemailerMock.transportProtocol).to.be.equal(referenceProtocol);
        });
        it("should be a eql structured object", function () {
            expect(nodemailerMock.smtpSettings).to.be.eql(smtpSettings.toConfigObject());
        });
    });

    describe("#sendMails", function () {
        it("should return a reference to its instance", function () {
            expect(
                smtpClient.sendMails(emailAddresses, onSendAll)
            ).to.be.equal(smtpClient);
        });
        it("should be an eql structured object", function () {
            expect(nodemailerMock.SMTPTransport.eMailObject).to.be.eql(eMail.toEmailObject());
        });

        describe("error case", function () {
            before(function() {
                nodemailerMock.SMTPTransport.error = true; //force error
                nodemailerMock.SMTPTransport.responseStatus = null;
            });

            it("should have 3 error cases", function (done) {
                onSendAll = function(failed, sent) {
                    expect(_(failed).toArray().length).to.be.equal(emailAddresses.length);
                    done();
                };

                smtpClient.sendMails(emailAddresses, onSendAll);
            });

            it("should have 0 sent cases", function (done) {
                onSendAll = function(failed, sent) {
                    expect(_(sent).toArray().length).to.be.equal(0);
                    done();
                };

                smtpClient.sendMails(emailAddresses, onSendAll);
            });
        });

        describe("sent cases", function () {
            before(function() {
                nodemailerMock.SMTPTransport.error = null;
                nodemailerMock.SMTPTransport.responseStatus = true; //force success
            });

            it("should have 3 sent cases", function (done) {
                onSendAll = function(failed, sent) {
                    expect(_(sent).toArray().length).to.be.equal(3);
                    done();
                };

                smtpClient.sendMails(emailAddresses, onSendAll);
            });

            it("should have 0 error cases", function (done) {
                onSendAll = function(failed, sent) {
                    expect(_(failed).toArray().length).to.be.equal(0);
                    done();
                };

                smtpClient.sendMails(emailAddresses, onSendAll);
            });
        });
    });

    describe("#closeSocket", function () {
        it("should return a reference to its instance", function () {
            expect(smtpClient.closeSocket()).to.be.equal(smtpClient);
        });
    });
});