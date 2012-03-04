"use strict";

var _ = require("underscore");

/**
 * A twitter REST-API-Client.
 *
 * @param {lib.twitter.TwitterUser} twitterUser
 * @param {lib.twitter.TwitterConsumer} twitterConsumer
 * @param {lib.twitter.TwitterSignature} twitterSignature (optional for tests)
 * @param {lib.oAuthTools} oAuthTools (optional for tests)
 * @param {node.https} https (optional for tests)
 *
 * @return {lib.twitter.TwitterRESTClient}
 */
function TwitterRESTClient(twitterUser, twitterConsumer, twitterSignature, oAuthTools, https) {

    var signingKey,
        baseURL,
        APIVersion,
        self = this;

    function __construct() {
        if (!twitterUser || !twitterConsumer) {
            throw new Error("You must provide an instance of TwitterUser, TwitterConsumer and TwitterSignature on construction.");
        }
        signingKey          = twitterSignature.createSigningKey(twitterConsumer.getConsumerSecret(), twitterUser.getAccessTokenSecret());
        APIVersion          = 1;
        baseURL             = "https://api.twitter.com/" + APIVersion + "/";
    }

    /**
     * If no format is given, format defaults to "json".
     * @see https://dev.twitter.com/docs/api/1/get/statuses/home_timeline
     *
     * @param error
     * @param success
     * @param format
     *
     * @return (Twitter)
     */
    this.getTweets = function (error, success, apiMethodParams, format) {
        if(format === undefined) format = "json";
        if(apiMethodParams === undefined) apiMethodParams = {};

        var httpMethod      = "GET",
            apiMethod       = "statuses/home_timeline." + format;

        __callAPI(error, success, httpMethod, apiMethod, apiMethodParams);

        return self;
    };

    /**
     * If no format is given, format defaults to "json".
     * @see https://dev.twitter.com/docs/api/1/post/statuses/update
     *
     * @param error
     * @param success
     * @param status
     * @param apiMethodParams
     * @param format
     *
     * @return (Twitter)
     */
    this.postTweet = function(error, success, status, apiMethodParams, format) {
        if(format === undefined) format = "json";
        if(apiMethodParams === undefined) apiMethodParams = {};

        var httpMethod      = "POST",
            apiMethod       = "statuses/update." + format,
            postBody        = {
                "status": oAuthTools.encodeURIComponent(status)
            };

        __callAPI(error, success, httpMethod, apiMethod, apiMethodParams, postBody);

        return self;
    };

    /**
     * Deletes a tweet specified by the given id.
     * @see https://dev.twitter.com/docs/api/1/post/statuses/destroy/%3Aid
     *
     * @param error (js.Function)
     * @param success (js.Function)
     * @param tweetId (js.String)
     * @param apiMethodParams (js.JSON)
     * @param format (js.String)
     *
     * @return (Twitter)
     */
    this.deleteTweet = function(error, success, tweetId, apiMethodParams, format) {
        if(!_.isString(tweetId)) {
            throw new Error("Given tweedId must be a string.");
        }
        if(format === undefined) format = "json";
        if(apiMethodParams === undefined) apiMethodParams = {};

        var httpMethod  = "POST",
            apiMethod   = "statuses/destroy/" + tweetId + "." + format;

        __callAPI(error, success, httpMethod, apiMethod, apiMethodParams);

        return self;
    };

    /**
     * HttpMethod must be written in upper: GET, POST and so on.
     *
     * @param httpMethod
     * @param apiMethod
     * @param error
     * @param success
     */
    function __callAPI(error, success, httpMethod, apiMethod, apiMethodParams, postBody) {
        //It is possible that a method like  /statuses/destroy uses POST as method without any body
        if(postBody === undefined) postBody = {};

        var oAuthParams         = __getFreshBaseOAuthParams(),
            options             = __getBaseRequestOptions(),
            signatureBaseParams = _.extend({}, apiMethodParams, oAuthParams, postBody),
            signatureBase       = twitterSignature.createSignatureBase(httpMethod, baseURL, apiMethod, signatureBaseParams),
            signature           = twitterSignature.createSignature(signingKey, signatureBase),
            authorizationHeader = __createAuthorizationHeaderString(signature, oAuthParams),
            postBodyString      = "",
            apiRequest;

        if(httpMethod === "POST") {
            postBodyString = oAuthTools.joinParams(postBody, "", false);
            options.headers["Content-Length"] = Buffer.byteLength(postBodyString);
            options.method = "POST";
        }
        options.headers.Authorization = authorizationHeader;
        options.path += apiMethod;
        if(_.keys(apiMethodParams).length !== 0) {
            options.path += "?" + oAuthTools.joinParams(apiMethodParams, "", false);
        }

        function responseCallback(response) {
            response.setEncoding("utf8");
            response.on("data", success);
            response.on("response", function () {
                var responseData = "";
                response.on("data", function (chunk) {
                    responseData += chunk;
                });
                response.on("end", function () {
                    success(responseData);
                });
            });
        }

        apiRequest = https.request(options, responseCallback);
        apiRequest.on("error", error);
        if(postBodyString !== "") {
            apiRequest.write(postBodyString);
        }
        apiRequest.end();
    }

    /**
     * @return (js.Number)
     */
    this.getSupportedAPIVersion = function () {
        return APIVersion;
    };

    /**
     * @return (js.JSON)
     */
    function __getBaseRequestOptions() {
        return {
            host:       "api.twitter.com",
            hostname:   "api.twitter.com",
            path:       "/" + APIVersion + "/",
            port:       443,
            headers:    {
                "Accept":           "*/*",
                "Connection":       "close",
                "Content-Type":     "application/x-www-form-urlencoded",
                "User-Agent":       "bananabombcanon"
            }
        };
    }

    function __getFreshBaseOAuthParams() {
        return {
            "oauth_consumer_key":       twitterConsumer.getConsumerKey(),
            "oauth_nonce":              oAuthTools.createNonce(32),
            "oauth_signature_method":   "HMAC-SHA1",
            "oauth_timestamp":          oAuthTools.createTimestamp(),
            "oauth_token":              twitterUser.getAccessToken(),
            "oauth_version":            "1.0"
        };
    }

    function __createAuthorizationHeaderString(signature, oAuthParams) {
        var signatureParam = {
            "oauth_signature": oAuthTools.encodeURIComponent(signature)
        },
        sortetParms = oAuthTools.sortParams(_.extend({}, oAuthParams, signatureParam));

        return ("OAuth " + oAuthTools.joinParams(oAuthTools.sortParams(sortetParms), ", ", true));
    }

    __construct();
}

module.exports = TwitterRESTClient;