"use strict";

function SMTPSettings() {

    var /**
         * @type {String}
         * @private
         */
        host,
        /**
         * @type {Number}
         * @private
         */
        port,
        /**
         * @type {String}
         * @private
         */
        clientServerName,
        /**
         * @type {String}
         * @private
         */
        userName,
        /**
         * @type {String}
         * @private
         */
        password,
        /**
         * @type {Boolean}
         * @private
         */
        useSecureConnection,
        /**
         * @type {Boolean}
         * @private
         */
        isDebugMode,
        /**
         * @type {Number}
         * @private
         */
        maxConnections,
        /**
         * @param {String}
         * @private
         */
        service,
        self = this;

    function __construct() {
        host = "localhost";
        port = 25;
        useSecureConnection = false;
        isDebugMode = false;
        maxConnections = 5;
    }

    /**
     * An optional well known service identifier ("Gmail", "Hotmail" etc.) to auto-configure host,
     * port and secure connection settings.
     *
     * @param {String} wellKnownServiceName
     *
     * @return {SMTPSettings}
     */
    this.autoConfigure = function(wellKnownServiceName) {
        service = wellKnownServiceName;
        return self;
    };

    /**
     * Hostname of the SMTP server. Defaults to localhost.
     *
     * @param {String} newHost
     *
     * @return {SMTPSettings}
     */
    this.setHost = function (newHost) {
        host = newHost;
        return self;
    };

    /**
     * Port of the SMTP server. Defaults to 25.
     *
     * @param {String} newPort
     *
     * @return {SMTPSettings}
     */
    this.setPort = function (newPort) {
        port = newPort;
        return self;
    };

    /**
     * The name of the client server. Defaults to machine name.
     *
     * @param newClientServerName
     *
     * @return {SMTPSettings}
     */
    this.setClientServerName = function (newClientServerName) {
        clientServerName = newClientServerName;
        return self;
    };

    /**
     * @param newUserName
     *
     * @return {SMTPSettings}
     */
    this.setUserName = function (newUserName) {
        userName = newUserName;
        return self;
    };

    /**
     * @param {String} newPassword
     *
     * @return {SMTPSettings}
     */
    this.setPassword = function (newPassword) {
        password = newPassword;
        return self;
    };

    /**
     * Enable SSL. If you're using port 587 then don't enable SSL, since the connection is started in insecure
     * plain text mode and only later upgraded with STARTTLS. Defaults to disabled.
     *
     * @retrun {SMTPSettings}
     */
    this.enableSecureConnection = function () {
        useSecureConnection = true;
        return self;
    };

    /**
     * Output client and server messages to console.
     *
     * @retrun {SMTPSettings}
     */
    this.enableDebugMode = function () {
        isDebugMode = true;
        return self;
    };

    /**
     * How many connections to keep in the pool. Defaults to 5.
     * @param {Number} newMaxConnections
     *
     * @return {SMTPSettings}
     */
    this.setMaxConnections = function (newMaxConnections) {
        maxConnections = newMaxConnections;
        return self;
    };

    /**
     * @return {Object}
     */
    this.toConfigObject = function() {
        return {
            "service": service,
            "host": host,
            "port": port,
            "secureConnection": useSecureConnection,
            "name": clientServerName,
            "auth": {
                "user": userName,
                "pass": password
            },
            "debug": isDebugMode,
            "maxConnections": maxConnections
        };
    };

    __construct();
}

module.exports = SMTPSettings;