"use strict"; // run code in ES5 strict mode

/**
 * Require all of the needed shizzle.
 */
var twitter     = require("../").twitter,
    everyauth   = require("everyauth"),
    express     = require("express");

/**
 * At first you need to create an instance of TwitterConsumer which is a represantation of your consumer (app);
 */
var twitterConsumer = new twitter.TwitterConsumer(/*consumerKey, consumerSecret*/);

/**
 * If you haven't already received all needed credentials you can use TwitterEveryauth to make your live easier.
 * For further information checkout the everyauth documentation.
 * @see https://github.com/bnoguchi/everyauth
 */
var twitterEveryauth = new twitter.TwitterEveryauth(everyauth, twitterConsumer);

/**
 * TwitterEveryauth is emitting "data" and "error" events.
 */
twitterEveryauth.on("data", function (session, userAccessToken, userAccessTokenSecret, twitterUserData) {
    var twitterUser = new twitter.TwitterUser(twitterUserData)
        .setAccessToken(userAccessToken)
        .setAccessTokenSecret(userAccessTokenSecret);

    var tweetMachine = new twitter.Twitter(twitterUser, twitterConsumer);
});

var consumer = express.createServer();
consumer.configure(function () {
    /**
     * Your express or connect stack
     */
    consumer.use(twitterEveryauth.getMiddleware());
    /**
    * Your express or connect stack
    *//
});

consumer.get('/', function (request, response) {
    /*Output here what ever you want*/
});

consumer.listen(/*Add here your consumers port.*/);