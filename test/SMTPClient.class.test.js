"use strict";

var expect = require("expect.js"),
    SMTPClient = require("../lib/email/SMTPClient.class"),
    smtpClient;

describe("SMTPClient", function () {

    describe("#__construct", function () {
        it("should be a SMTPClient", function () {
            expect(new SMTPClient).to.be.a(SMTPClient);
        })
    });

    describe("Setter", function () {
        describe()
    });
});