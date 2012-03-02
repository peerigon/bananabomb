"use strict";

var _ = require("underscore");

/**
 * Tools for creating a signature according to the twitter-API documentation.
 * @see @see https://dev.twitter.com/docs/auth/creating-signature
 *
 * @param {lib.oAuthTools} oAuthTools
 */
module.exports = function TwitterSignature(oAuthTools) {

    var oATools,
        self = this;

    function __construct() {
        oATools = oAuthTools || require("../oAuthTools");
    }

    /**
     * Creates a signing key according to according to the twitter-API documentation
     *
     * @param consumerSecret (js.String)
     * @param accessTokenSecret (js.String)
     *
     * @return (js.String)
     */
    this.createSigningKey = function(consumerSecret, accessTokenSecret) {
        var encodedConsumerSecret    = oATools.encodeURIComponent(consumerSecret),
            encodedAccessTokenSecret = oATools.encodeURIComponent(accessTokenSecret);

        return(encodedConsumerSecret + "&" + encodedAccessTokenSecret);
    };

    /**
     * Creates a signature base according to the twitter-API documentation.
     * @see https://dev.twitter.com/docs/auth/creating-signature
     *
     * @param httpMethod (js.String) "POST" or "GET"
     * @param baseURL (js.String) usually "https://api.twitter.com/1/"
     * @param apiMethod (js.String) e.g. "statuses/update"
     * @param params (js.JSON)
     *
     * @return (js.String)
     */
    this.createSignatureBase = function(httpMethod, baseURL, apiMethod, params) {

        var encodedAPICall,
            encodedAPICallParams;

        encodedAPICall          = oATools.encodeURIComponent(baseURL + apiMethod);
        params                  = oATools.sortParams(params);
        params                  = oATools.joinParams(params, "&", false);
        encodedAPICallParams    = oATools.encodeURIComponent(params);

        return (httpMethod + "&" + encodedAPICall + "&" + encodedAPICallParams);
    };

    /**
     * Creates a signature according to the twitter-API documentation.
     * @see https://dev.twitter.com/docs/auth/creating-signature
     *
     * @param signingKey (js.String)
     * @param signatureBase (js.String)
     *
     * @return (js.String)
     */
    this.createSignature = function (signingKey, signatureBase) {
        return oATools.createHMACSignature("sha1", signingKey, signatureBase, "base64");
    };

    __construct();
};