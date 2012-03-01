"use strict";
/**
 * Authorization of a request @see https://dev.twitter.com/docs/auth/authorizing-request
 * Creating signature for a request @see https://dev.twitter.com/docs/auth/creating-signature
 */
module.exports = {
    consumerKey:            "fxgbjMiSdmOcoeT23h5gw",
    consumerSecret:         "AqdElroUpgM79La6tDXitBfPjDS0IV5mtuxd8l4r0nc",
    accessToken:            "501611188-V7rb4YCX6TJwdZRdYkDCG3Q3rt65RD2q02lQSTkk",
    accessTokenSecret:      "JlNDPm5mCD2jGXYLCTH2lhLQuMPU7XvHBV2PQaVtvVQ",
    timestamp:              1330521318,
    httpMethod:             "POST",
    baseURL:                "https://api.twitter.com/1/",
    apiMethod:              "statuses/update.json",
    apiMethodParams:        {
        "include_entities": true,
        "trim_user":        true
    },
    oAuthParams:            {
        "oauth_consumer_key":       this.consumerKey,
        "oauth_nonce":              "16aea54f2f16e20250c5186ab0eadc58",
        "oauth_signature_method":   "HMAC-SHA1",
        "oauth_timestamp":          1330521318,
        "oauth_token":              this.accessToken,
        "oauth_version":            "1.0"
    },
    postBody:               {
        "status" : "Hello Ladies + Gentlemen, a signed OAuth request!"
    },
    postBodyURIEncoded:     {
        "status" :  "Hello%20Ladies%20%2B%20Gentlemen%2C%20a%20signed%20OAuth%20request%21"
    },
    signingKey:     "AqdElroUpgM79La6tDXitBfPjDS0IV5mtuxd8l4r0nc&JlNDPm5mCD2jGXYLCTH2lhLQuMPU7XvHBV2PQaVtvVQ",
    signatureBase:  "POST&https%3A%2F%2Fapi.twitter.com%2F1%2Fstatuses%2Fupdate.json&include_entities%3Dtrue%26" +
        "oauth_consumer_key%3DfxgbjMiSdmOcoeT23h5gw%26" +
        "oauth_nonce%3D16aea54f2f16e20250c5186ab0eadc58%26" +
        "oauth_signature_method%3DHMAC-SHA1%26" +
        "oauth_timestamp%3D1330521318%26" +
        "oauth_token%3D501611188-V7rb4YCX6TJwdZRdYkDCG3Q3rt65RD2q02lQSTkk%26" +
        "oauth_version%3D1.0%26" +
        "status%3DHello%2520Ladies%2520%252B%2520Gentlemen%252C%2520a%2520signed%2520OAuth%25",
    signature:      "P1CR/JORhT7yM0yRPaWE+TaJfKQ=",
    header: {
        Accept:           "*/*",
        Connection:       "close",
        "Content-Type":   "application/x-www-form-urlencoded",
        "Content-Length": 76,
        Authorization:    'OAuth oauth_consumer_key="fxgbjMiSdmOcoeT23h5gw", ' +
            'oauth_nonce="16aea54f2f16e20250c5186ab0eadc58", ' +
            'oauth_signature="P1CR%2FJORhT7yM0yRPaWE%2BTaJfKQ%3D", ' +
            'oauth_signature_method="HMAC-SHA1", ' +
            'oauth_timestamp="1330521318", ' +
            'oauth_token="501611188-V7rb4YCX6TJwdZRdYkDCG3Q3rt65RD2q02lQSTkk", ' +
            'oauth_version="1.0"'
    }
};