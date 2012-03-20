"use strict";

module.exports = {
    SMTPTransport: {
        eMailObject: null,
        error: null,
        responseStatus: null,
         /**
          * @param {Object} eMailObject
          * @param {Function} callback
          */
         sendMail: function (eMailObject, callback) {
            this.eMailObject = eMailObject;
            callback(this.error, this.responseStatus);
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
     * @param {String} transportProtocol
     * @param {SMTPSettings} smtpSettings
     */
    createTransport: function (transportProtocol, smtpSettings) {
        this.transportProtocol = transportProtocol;
        this.smtpSettings = smtpSettings;

        return this.SMTPTransport;
    }
};