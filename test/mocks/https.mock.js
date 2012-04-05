"use strict";

module.exports = {
    response: {
        encoding:   "",
        setEncoding: function (newEncoding) {
            this.encoding = newEncoding;
        },
        eventName:  "",
        callback:   function() {},
        on:         function (newEventName, newCallback) {
            this.eventName   = newEventName;
            this.callback    = newCallback;
            //Do nothing. This method shall only exist so that the code works.
        }
    },
    requestOptions: {},
    request: function (newOptions, callback) {

        this.requestOptions = newOptions;

        callback(this.response);

        return {
            onEventName:    "",
            onCallback:     function() {},
            on:             function (eventName, callback) {
                this.onEventName = eventName;
                this.onCallback  = callback;
                //Do nothing else. This method mailny exist so that the code will work.
            },
            end:            function () { /*Do nothing. This method shall only exist so that the code works.*/ },
            bodyString:     "",
            write:          function (newBodyString) {
                this.bodyString = newBodyString;
            }
        };
    }
};