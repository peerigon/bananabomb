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
         * @type {!Array}
         * @private
         */
        receiverEmails = [],
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
        nodemailer = nodemailer || require("nodemailer");
    }

    /**
     * @param {Array|String} newReceiverEmails
     *
     * @return {SMTPClient}
     */
    this.setReceiverEmails = function (newReceiverEmails) {
        if (_(receiverEmails).isArray()) {
            receiverEmails = newReceiverEmails;
        } else {
            receiverEmails = [];
            receiverEmails.push(receiverEmails);
        }
        return self;
    };

    /**
     * @param {Function} onSendAll .
     */
    this.sendEmails = function(onSendAll) {

        function sendMail(receiverEmail) {
            eMail.setTo(receiverEmail);
            smtpTransport.sendMail(eMail.toEmailObject(), function (error, responseStatus) {
                if(error) {
                    failed[receiverEmail] = error;
                } else {
                    sent[receiverEmails] = responseStatus;
                }
            });
        }

        _(receiverEmails).each(sendMail);

        onSendAll(failed, sent);
        return self;
    };

    /**
     * @return {SMTPClient}
     */
    this.openSocket = function () {
        console.log(smtpSettings.toConfigObject());
        smtpTransport = nodemailer.createTransport("SMTP", smtpSettings.toConfigObject());
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