var expect  = require("expect.js"),
    EMail = require("../lib/email/EMail.class"),
    eMail,
    from,
    to,
    cc,
    bcc,
    replyTo,
    subject,
    message;

describe("EMail", function () {

    describe("#__construct", function () {
        it("should be an instance of EMailer", function () {
            expect(new EMail()).to.be.an(EMail);
        });
    });

    before(function () {
        eMail = new EMail();
        from = "noreplay@pand.aa";
        to = "some@bo.dy";
        cc = "some@bodyel.se";
        bcc = "somebody@mysterio.us";
        replyTo = to;
        subject = "Test Test Test";
        message = "<h1>Hey I'm so important</h1><p>Blah Blah Blub. Foo bar, foo bar ... .</p>";
    });

    describe("Setter", function () {
        describe("#setFrom", function () {
            it("should return a reference to its instance", function () {
                expect(eMail.setFrom(from)).to.be.equal(eMail);
            });
        });

        describe("#setTo", function () {
            it("should return a refernec to its instance", function () {
                expect(eMail.setTo(to)).to.be.equal(eMail);
            });
        });

        describe("#setCC", function () {
            it("should return a refernec to its instance", function () {
                expect(eMail.setCC(cc)).to.be.equal(eMail);
            });
        });

        describe("#setBCC", function () {
            it("should return a refernec to its instance", function () {
                expect(eMail.setBCC(bcc)).to.be.equal(eMail);
            });
        });

        describe("#setReplyTo", function () {
            it("should return a refernec to its instance", function () {
                expect(eMail.setReplyTo(replyTo)).to.be.equal(eMail);
            });
        });

        describe("#setSubject", function () {
            it("should return a refernec to its instance", function () {
                expect(eMail.setSubject(subject)).to.be.equal(eMail);
            });
        });

        describe("#setMessage", function () {
            it("should return a refernec to its instance", function () {
                expect(eMail.setMessage(message)).to.be.equal(eMail);
            });
        });
    });

    describe("#toEmailObject", function () {
        it("should return an object with a eql structure", function () {
            expect(eMail.toEmailObject()).to.be.eql({
                "from": from,
                "to": to,
                "cc": cc,
                "bcc": bcc,
                "replyTo": replyTo,
                "subject": subject,
                "html": message
            });
        });
    });
});