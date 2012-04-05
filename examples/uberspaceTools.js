"use strict";

function __rewriteHost(request, response, next) {
    var splittedPath = __dirname.split("/"),
        playground = splittedPath[splittedPath.length - ["bananabombcanon", "app", "lib"].length];

    if (request.headers["x-forwarded-host"]) {
        request.headers.host = request.headers["x-forwarded-host"] + "/" + playground + "/bananabomb";
    }

    next();
}

exports.rewriteHost = function() {
    return __rewriteHost;
};