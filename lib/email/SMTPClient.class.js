"use strict";

var EventEmitter = require("events").EventEmitter,
    util = require("util"),
    _ = require("underscore");

/**
 *
 * @param {SMTPSettings} smtpSettings
 * @param {EMail} eMail
 * @param {nodemailer}
 */
function SMTPClient (smtpSettings, eMail, nodemailer) {
    EventEmitter.call(this);

    var /**
         * @type {Object}
         * @private
         */
        send = {},
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
         * @type {nodemailer.Transport}
         * @private
         */
        transport,
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
     * Emitts "sendall".
     *
     * @param {Function} error
     * @param {Function} success
     */
    this.sendEmails = function(error, success) {

        function sendMail(receiverEmail) {
            eMail.setTo(receiverEmail);
            transport.sendMail(eMail.toEmailObject(), function (error, responseStatus) {
                if(error) {
                    failed[receiverEmail] = error;
                } else {
                    send[receiverEmails] = responseStatus;
                }
            });
        }

        _.(receiverEmails).each(sendMail);

        self.emit("sendall");
    };

    /**
     * @retrun {Object}
     */
    this.getSend = function () {
        return send;
    };

    /**
     * @return {Object}
     */
    this.getFailed = function () {
        return failed;
    };

    this.openSocket = function () {
        transport = nodemailer.createTransport("SMTP", smtpSettings.toConfigObject());
    };

    this.closeSocket = function () {
        transport.close();
    };

    __construct();
}

util.inherits(SMTPClient, EventEmitter);

module.exports = SMTPClient;