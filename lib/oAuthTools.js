"use strict"; // run code in ES5 strict mode

var crypto      = require("crypto"),
    _           = require("underscore"),
    nonceChars  = "ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz0123456789";

module.exports = Object.freeze({

    encodeURIComponent: function(uriComponent) {
        return (
            encodeURIComponent(uriComponent)
            .replace(/\!/g, "%21")
            .replace(/\'/g, "%27")
            .replace(/\(/g, "%28")
            .replace(/\)/g, "%29")
            .replace(/\*/g, "%2A")
        );
    },

    decodeURIComponent: function(uriComponent) {
        return (
            decodeURIComponent(uriComponent)
            .replace(/\%21/g, "!")
            .replace(/\%27/g, "'")
            .replace(/\%28/g, "(")
            .replace(/\%29/g, ")")
            .replace(/\%2A/g, "*")
        );
    },

    createHMACSignature: function(hashMethod, signingKey, signatureBase, digestMethod) {
        return (crypto.createHmac(hashMethod, signingKey).update(signatureBase).digest(digestMethod));
    },

    createNonce: function(length) {
        var nonce = "",
            randomNumber,
            i;

        for (i = 0; i < length; ++i) {
            randomNumber = Math.floor(Math.random() * nonceChars.length);
            nonce += nonceChars.substring(randomNumber, randomNumber + 1);
        }

        return nonce;
    },

    createTimestamp: function () {
        return Math.floor(new Date().getTime() / 1000);
    },

    sortParams: function (params) {
        var sortedParams    = {},
            sortedParamKeys = _.keys(params).sort();

        function mapParam(paramKey) {
            sortedParams[paramKey] = params[paramKey];
        }

        _.each(sortedParamKeys, mapParam);

        return sortedParams;
    },
    joinParams: function(params, seperator, valuesWithQutes) {
        var paramKeys   = _.keys(params),
            paramArray  = [];

        function getQutes() {
            return (valuesWithQutes === true) ? '"' : '';
        }

        function createParamString(paramKey) {
            paramArray.push(
                paramKey + "=" + getQutes() + params[paramKey] + getQutes()
            );
        }
        _.each(paramKeys, createParamString);

        return paramArray.join(seperator);
    }
});