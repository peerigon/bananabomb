"use strict";
/**
 * Authorization of a request @see https://dev.twitter.com/docs/auth/authorizing-request
 * Creating signature for a request @see https://dev.twitter.com/docs/auth/creating-signature
 */
module.exports = {
    consumerKey:            "xvz1evFS4wEEPTGEFPHBog",
    consumerSecret:         "kAcSOqF21Fu85e7zjz7ZN2U4ZRhfV3WpwPAoE3Z7kBw",
    accessToken:            "370773112-GmHxMAgYyLbNEtIKZeRNFsMKPR9EyMZeS9weJAEb",
    accessTokenSecret:      "LswwdoUaIvS8ltyTt5jkRh4J50vUPVVHtR2YPi5kE",
    timestamp:              1318622958,
    httpMethod:             "POST",
    baseURL:                "https://api.twitter.com/1/",
    apiMethod:              "statuses/update.json",
    apiMethodParams:        {
        "include_entities": true
    },
    oAuthParams:            {
        "oauth_consumer_key":       "xvz1evFS4wEEPTGEFPHBog",
        "oauth_nonce":              "kYjzVBB8Y0ZFabxSWbWovY3uYSQ2pTgmZeNu2VS4cg",
        "oauth_signature_method":   "HMAC-SHA1",
        "oauth_timestamp":          1318622958,
        "oauth_token":              "370773112-GmHxMAgYyLbNEtIKZeRNFsMKPR9EyMZeS9weJAEb",
        "oauth_version":            "1.0"
    },
    postBody:               {
        "status" : "Hello Ladies + Gentlemen, a signed OAuth request!"
    },
    postBodyURIEncoded:     {
        "status" : "Hello%20Ladies%20%2B%20Gentlemen%2C%20a%20signed%20OAuth%20request%21"
    },
    signingKey:    "kAcSOqF21Fu85e7zjz7ZN2U4ZRhfV3WpwPAoE3Z7kBw&LswwdoUaIvS8ltyTt5jkRh4J50vUPVVHtR2YPi5kE",
    signatureBase:
                            "POST&https%3A%2F%2Fapi.twitter.com%2F1%2Fstatuses%2Fupdate.json&include_entities%3Dtrue%26" +
                                "oauth_consumer_key%3Dxvz1evFS4wEEPTGEFPHBog%26" +
                                "oauth_nonce%3DkYjzVBB8Y0ZFabxSWbWovY3uYSQ2pTgmZeNu2VS4cg%26" +
                                "oauth_signature_method%3DHMAC-SHA1%26" +
                                "oauth_timestamp%3D1318622958%26" +
                                "oauth_token%3D370773112-GmHxMAgYyLbNEtIKZeRNFsMKPR9EyMZeS9weJAEb%26" +
                                "oauth_version%3D1.0%26" +
                                "status%3DHello%2520Ladies%2520%252B%2520Gentlemen%252C%2520a%2520signed%2520OAuth%2520request%2521",
    signature: "tnnArxj06cWHq44gCs1OSKk/jLY=",
    header: {
        Accept:             "*/*",
        Connection:         "close",
        "Content-Type":     "application/x-www-form-urlencoded",
        "Content-Length":   76,
        Authorization:     'OAuth oauth_consumer_key="xvz1evFS4wEEPTGEFPHBog", ' +
            'oauth_nonce="kYjzVBB8Y0ZFabxSWbWovY3uYSQ2pTgmZeNu2VS4cg", ' +
            'oauth_signature="tnnArxj06cWHq44gCs1OSKk%2FjLY%3D", ' +
            'oauth_signature_method="HMAC-SHA1", ' +
            'oauth_timestamp="1318622958", ' +
            'oauth_token="370773112-GmHxMAgYyLbNEtIKZeRNFsMKPR9EyMZeS9weJAEb", ' +
            'oauth_version="1.0"'
    }
};
