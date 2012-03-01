"use strict";

module.exports = {
    consumerKey:            "fxgbjMiSdmOcoeT23h5gw",
    consumerSecret:         "AqdElroUpgM79La6tDXitBfPjDS0IV5mtuxd8l4r0nc",
    accessToken:            "501611188-V7rb4YCX6TJwdZRdYkDCG3Q3rt65RD2q02lQSTkk",
    accessTokenSecret:      "JlNDPm5mCD2jGXYLCTH2lhLQuMPU7XvHBV2PQaVtvVQ",
    timestamp:              1330508072,
    httpMethod:             "GET",
    baseURL:                "https://api.twitter.com/1/",
    apiMethod:              "home_timeline.json",
    apiMethodParams:        {
        "include_entities": true,
        count:              5
    },
    oAuthParams:            {
        "oauth_consumer_key":       this.consumerKey,
        "oauth_nonce":              "640a65b227da70480ab252a23324470c",
        "oauth_signature_method":   "HMAC-SHA1",
        "oauth_timestamp":          this.timestamp,
        "oauth_token":              this.accessToken,
        "oauth_version":            "1.0"
    },
    signingKey:             "AqdElroUpgM79La6tDXitBfPjDS0IV5mtuxd8l4r0nc" + "&" + "JlNDPm5mCD2jGXYLCTH2lhLQuMPU7XvHBV2PQaVtvVQ",
    signatureBase:          "GET&https%3A%2F%2Fapi.twitter.com%2F1%2Fstatuses%2Fhome_timeline.json&count%3D5%26" +
                            "include_entities%3Dtrue%26" +
                            "oauth_consumer_key%3DfxgbjMiSdmOcoeT23h5gw%26" +
                            "oauth_nonce%3D640a65b227da70480ab252a23324470c%26" +
                            "oauth_signature_method%3DHMAC-SHA1%26" +
                            "oauth_timestamp%3D1330508072%26" +
                            "oauth_token%3D501611188-V7rb4YCX6TJwdZRdYkDCG3Q3rt65RD2q02lQSTkk%26" +
                            "oauth_version%3D1.0",
    signature: "ZgrNr7ybKVrGHP0qq0uC2TZoIi4=",
    header: {
        Accept:         "*/*",
        Connection:     "close",
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:  'OAuth oauth_consumer_key="fxgbjMiSdmOcoeT23h5gw", ' +
                                'oauth_nonce="640a65b227da70480ab252a23324470c", ' +
                                'oauth_signature="ZgrNr7ybKVrGHP0qq0uC2TZoIi4%3D", ' +
                                'oauth_signature_method="HMAC-SHA1", ' +
                                'oauth_timestamp="1330508072", ' +
                                'oauth_token="501611188-V7rb4YCX6TJwdZRdYkDCG3Q3rt65RD2q02lQSTkk", ' +
                                'oauth_version="1.0"'
    }
};