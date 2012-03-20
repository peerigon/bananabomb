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
         * @type {Object}
         * @private
         */
        sent = {},
        /**
         * @type {Object}
         * @private
         */
        failed = {},
        /**
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
     * @param {Array|String} emailAddresses
     *
     * @return {SMTPClient}
     */
    this.sendMails = function(emailAddresses, onSendAll) {
        if(_(emailAddresses).isString()) {
            emailAddresses = [emailAddresses];
        }

        function isLastReceiver(emailAddress) {
            return ((emailAddresses.length - 1) === emailAddresses.indexOf(emailAddress));
        }

        function sendMail(emailAddress) {
            eMail.setTo(emailAddress);

            smtpTransport.sendMail(eMail.toEmailObject(), function (error, responseStatus) {
                if(error) {
                    failed[emailAddress] = error;
                } else {
                    sent[emailAddress] = responseStatus;
                }

                if(isLastReceiver(emailAddress)) {
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