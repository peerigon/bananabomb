"use strict";

function FacebookGraphApi(facebookUser, facebookCustomer, https, oAuthTools) {
    
    var apiUrl = "graph.facebook.com",
    self = this;

    function __construct() {
        if(!facebookUser || !facebookCustomer) {
            throw new Error("You must provide an instance of FacebookUser and FacebookConsumer on construction");
        }
        
        https = https || require("https")
        oAuthTools = oAuthTools || require("../oAuthTools");
        
    }
    
    this.getStatuses = function (error, success) {
         
        var httpMethod  = "GET",
        apiMethod   = facebookUser.getId() + "/statuses?access_token=" + facebookUser.getAccessToken();
                        
        __callApi(error, success, httpMethod, apiMethod);
              
        return self;
    };
    
    
    this.postStatus = function (error, success, status) {
        
        status = oAuthTools.encodeURIComponent(status);
        
        var httpMethod      = "POST",
            apiMethod       = facebookUser.getId() + "/feed?message=" + status + "&access_token=" + facebookUser.getAccessToken();

        __callApi(error, success, httpMethod, apiMethod);
        
        return self;
    }
    
    this.deleteStatus = function (error, succes, statusId) {
        
        var httpMethod      = "DELETE",
            apiMethod       = facebookUser.getId() + "_" + statusId + "?access_token=" + facebookUser.getAccessToken();
            
        __callApi(error, succes, httpMethod, apiMethod);
        
        return self;
    }
    
    function __callApi(error, success, httpMethod, apiMethod) {
        
        var options     = __getBaseRequestOptions(),
            apiRequest;
            
        options.path += apiMethod;
        options.method = httpMethod;
        
        //        
        //        function responseCallback(response) {
        //            response.setEncoding("utf8");
        //            response.on("data", success);
        //            response.on("response", function () {
        //                var responseData = "";
        //                response.on("data", function (chunk) {
        //                    repsonseData += chunk;
        //                });
        //                response.on("end", function () {
        //                    success(responseData);
        //                });
        //            });
        //        }
        var req = https.request(options, function(res) {
            console.log("statusCode: ", res.statusCode);
            console.log("headers: ", res.headers);

            res.on('data', function(d) {
                process.stdout.write(d);
            });
        });
        req.end();

        req.on('error', function(e) {
            console.error(e);
        });
        
    //        apiRequest = https.request(options, responseCallback);
    //        apiRequest.on("error", error);
    //        apiRequest.end();

    }
    
    function __getBaseRequestOptions() {
        return {
            host:       apiUrl,
            hostname:   apiUrl,
            path:       "/"
        };
    }
    
    __construct();

}

module.exports = FacebookGraphApi;