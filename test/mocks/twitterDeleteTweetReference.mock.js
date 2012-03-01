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
    timestamp:              1330524574,
    httpMethod:             "POST",
    baseURL:                "https://api.twitter.com/1/",
    apiMethod:              "statuses/destroy/174116712923406336.json",
    apiMethodParams:        {},
    oAuthParams:            {
        "oauth_consumer_key":       "fxgbjMiSdmOcoeT23h5gw",
        "oauth_nonce":              "c01b7c220bb18acf25b1b8573c810805",
        "oauth_signature_method":   "HMAC-SHA1",
        "oauth_timestamp":          1330524574,
        "oauth_token":              "501611188-V7rb4YCX6TJwdZRdYkDCG3Q3rt65RD2q02lQSTkk",
        "oauth_version":            "1.0"
    },
    tweetId:        "174116712923406336",
    signingKey:     "AqdElroUpgM79La6tDXitBfPjDS0IV5mtuxd8l4r0nc&JlNDPm5mCD2jGXYLCTH2lhLQuMPU7XvHBV2PQaVtvVQ",
    signatureBase:  "POST&https%3A%2F%2Fapi.twitter.com%2F1%2Fstatuses%2Fdestroy%2F174116712923406336.json&oauth_consumer_key%3DfxgbjMiSdmOcoeT23h5gw%26" +
                    "oauth_nonce%3Dc01b7c220bb18acf25b1b8573c810805%26" +
                    "oauth_signature_method%3DHMAC-SHA1%26" +
                    "oauth_timestamp%3D1330524574%26" +
                    "oauth_token%3D501611188-V7rb4YCX6TJwdZRdYkDCG3Q3rt65RD2q02lQSTkk%26" +
                    "oauth_version%3D1.0",
    signature:      "0Mb59VcwbUU5CYnsAUMLN7bUuxE=",
    header: {
        Accept:           "*/*",
        Connection:       "close",
        "Content-Type":   "application/x-www-form-urlencoded",
        Authorization:    'OAuth oauth_consumer_key="fxgbjMiSdmOcoeT23h5gw", ' +
                                'oauth_nonce="c01b7c220bb18acf25b1b8573c810805", ' +
                                'oauth_signature="0Mb59VcwbUU5CYnsAUMLN7bUuxE%3D", ' +
                                'oauth_signature_method="HMAC-SHA1", ' +
                                'oauth_timestamp="1330524574", ' +
                                'oauth_token="501611188-V7rb4YCX6TJwdZRdYkDCG3Q3rt65RD2q02lQSTkk", ' +
                                'oauth_version="1.0"'
    }
};