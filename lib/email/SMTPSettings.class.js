"use strict";

function SMTPSettings() {

    var /**
         * @type {js.String}
         * @private
         */
        host,
        /**
         * @type {js.Number}
         * @private
         */
        port,
        /**
         * @type {js.String}
         * @private
         */
        name,
        self = this;

    function __construct() {

    }

    /**
     * @param {js.String} newHost
     *
     * @return {lib.email.SMTPSettings}
     */
    this.setHost = function (newHost) {
        host = newHost;
        return self;
    };

    /**
     * @return {js.String}
     */
    this.getHost = function () {
        return host;
    };

    /**
     * @param {js.String} newPort
     *
     * @return {lib.email.SMTPSettings}
     */
    this.setPort = function (newPort) {
        port = newPort;
        return self;
    };

    /**
     * @return {js.Number}
     */
    this.getPort = function () {
        return port;
    };

    /**
     * @param newName
     *
     * @return {lib.email.SMTPSettings}
     */
    this.setName = function (newName) {
        name = newName;
        return self;
    };

    /**
     * @return {js.String}
     */
    this.getName = function () {
         return name;
    };

    __construct();
}

module.exports = SMTPSettings;