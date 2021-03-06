"use strict";

function EMail() {

    var /**
         * @param {String}
         * @private
         */
        from,
        /**
         * @param {String}
         * @private
         */
        to,
        /**
         * @param {String}
         * @private
         */
        cc,
        /**
         * @param {String}
         * @private
         */
        bcc,
        /**
         *
         */
        headers,
        /**
         * @param {String}
         * @private
         */
        replyTo,
        /**
         * @param {String}
         * @private
         */
        subject,
        /**
         * @param {String}
         * @private
         */
        message,
        /**
         * @param {EMail}
         * @private
         */
        self = this;

    function __construct() {

    }

    /**
     * @param {String} newFrom
     *
     * @return {EMail}
     */
    this.setFrom = function (newFrom) {
        from = newFrom;
        return self;
    };

    /**
     * @param {String} newTo
     *
     * @return {EMail}
     */
    this.setTo = function(newTo) {
        to = newTo;
        return self;
    };

    /**
     * @param {String} newCC
     *
     * @return {EMail}
     */
    this.setCC = function (newCC) {
        cc = newCC;
        return self;
    };

    /**
     * @param {String }newBCC
     *
     * @return {EMail}
     */
    this.setBCC = function (newBCC) {
        bcc = newBCC;
        return self;
    };

    /**
     * Add aditional headers
     *
     * @param {Object} additionalHeaders
     *
     * @retrun {EMail}
     */
    this.setHeaders = function (additionalHeaders) {
        headers = additionalHeaders;
        return self;
    };

    /**
     * @param newReplyTo
     *
     * @return {EMail}
     */
    this.setReplyTo = function (newReplyTo) {
        replyTo = newReplyTo;
        return self;
    };

    /**
     * @param {String} newSubject
     *
     * @return {EMail}
     */
    this.setSubject = function (newSubject) {
        subject = newSubject;
        return self;
    };

    /**
     * @param {String} newMessage
     *
     * @return {EMail}
     */
    this.setMessage = function (newMessage) {
        message = newMessage;
        return self;
    };

    /**
     * @return {Object}
     */
    this.toEmailObject = function () {
        return {
            "from": from,
            "to": to,
            "cc": cc,
            "bcc": bcc,
            "headers": headers,
            "replyTo": replyTo,
            "subject": subject,
            "html": message
        }
    };

    __construct();
}

module.exports = EMail;