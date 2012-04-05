"use strict";

var _ = require("underscore");

/**
 *
 * @param {SMTPSettings} smtpSettings
 * @param {EMail} eMail
 * @param {nodemailer}
 */
function SMTPClient (smtpSettings, eMail, nodemailer) {
    var /**
         * @type {nodemailer.SMTPTransport}
         * @private
         */
        smtpTransport,
        /**
         * @type {SMTPClient}
         * @private
         */
        self = this;

    function __construct() {
        if(!smtpSettings || !eMail) {
            throw Error("You must provide an instance of SMTPSettings and EMail as parameter.");
        }
        nodemailer = nodemailer || require("nodemailer");
    }

    /**
     * @return {SMTPClient}
     */
    this.openSocket = function () {
        smtpTransport = nodemailer.createTransport("SMTP", smtpSettings.toConfigObject());
        return self;
    };

    /**
     * To onSendAll callback an array with all failed as first and all sent as second parameter will be passed.
     * Both arrays contains objects with the following structure:
     * <ul>
     *    <li><for failed: {emailAddress: Error}</li>
     *    <li>for sent: {emailAddress: responseStatus}</li>
     * </ul>
     *
     *
     * @param {Array|String} emailAddresses
     *
     * @return {SMTPClient}
     */
    this.sendMails = function(emailAddresses, onSendAll) {
        var failed = [],
            tmpFailed,
            sent = [],
            tmpSent,
            emailAdressesLastIndex = emailAddresses.length - 1;

        if(_(emailAddresses).isString()) {
            emailAddresses = [emailAddresses];
        }

        function sendMail(emailAddress, emailAdressIndex) {
            eMail.setTo(emailAddress);

            smtpTransport.sendMail(eMail.toEmailObject(), function (error, responseStatus) {
                if(error) {
                    tmpFailed = {};
                    tmpFailed[emailAddress] = error;
                    failed.push(tmpFailed);
                } else {
                    tmpSent = {};
                    tmpSent[emailAddress] = responseStatus;
                    sent.push(tmpSent);
                }

                if(emailAdressIndex === emailAdressesLastIndex) {
                    onSendAll(failed, sent);
                }
            });
        }

        _(emailAddresses).each(sendMail);

        return self;
    };

    /**
     * @return {SMTPClient}
     */
    this.closeSocket = function () {
        smtpTransport.close();
        return self;
    };

    __construct();
}

module.exports = SMTPClient;