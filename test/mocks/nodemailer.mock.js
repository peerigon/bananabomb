"use strict";

module.exports = {
    SMTPTransport: {
        eMail: null,
        sendMailCallback: null,
         /**
          * @param {EMail} eMail
          * @param {Function} callback
          */
         sendMail: function (eMail, callback) {
             this.eMail = eMail;
             this.sendMailCallback = callback;

         },
        /**
         * Do nothing
         */
        close: function () {

        }
    },
    transportProtocol: null,
    smtpSettings: null,
    /**
     *
     * @param {String} protocol
     * @param {SMTPSettings} smtpSettings
     */
    createTransport: function (transportProtocol, smtpSettings) {
        this.transportProtocol = transportProtocol;
        this.smtpSettings = smtpSettings;

        return this.SMTPTransport;
    }
};