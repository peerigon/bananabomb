"use strict"; // run code in ES5 strict mode

/**
 * Require all of the needed shizzle.
 * Actually you don't need everyauth or express to use bananabomb.
 * But both modules are used here in the example to demonstrate how to get user credentials from Twitter.
 */
var twitter     = require("../").twitter,
    everyauth   = require("everyauth"),
    express     = require("express");

/**
 * At first you need to create an instance of TwitterConsumer which is a represantation of your consumer (app);
 * Provide your cosumerKey and consumerSecert which you'll get from Twitter after you have created an app.
 */
var twitterConsumer = new twitter.TwitterConsumer(/*consumerKey, consumerSecret*/);

/**
 * If you haven't already received all needed credentials you can use TwitterEveryauth to make your live easier.
 * For further information checkout the everyauth documentation.
 * @see https://github.com/bnoguchi/everyauth
 * Keep in mind that you don't need to use everyauth.
 */
var twitterEveryauth = new twitter.TwitterEveryauth(everyauth, twitterConsumer);

/**
 * TwitterEveryauth is emitting "data" and "error" events.
 */
twitterEveryauth.on("data", function (session, userAccessToken, userAccessTokenSecret, twitterUserData) {
    var twitterUser = new twitter.TwitterUser(twitterUserData)
        .setAccessToken(userAccessToken)
        .setAccessTokenSecret(userAccessTokenSecret);

    /**
     * Create the Twitter-REST-Client. It needs the user credentials and consumer credentials to authenticate the
     * requests.
     */
    var tweetMachine = new twitter.Twitter(twitterUser, twitterConsumer);

    /**
     * Let's post a tweet now.
     */
    tweetMachine.postTweet(
        function() { /*Error callback*/ },
        function() { /*Success callback*/ },
        "Let's code object orientated!",
        {"include_entities": true}
    ) ;

    tweetMachine.getTweets(
        function() { /*Error callback*/ },
        function() { /*Success callback*/ },
        {"include_entities": true}
    );

    tweetMachine.deleteTweet(
        function() { /*Error callback*/ },
        function() { /*Success callback*/ },
        "19648962835626485936845683485", //tweedId
        {"include_entities": true}
    );

});

var consumer = express.createServer();
consumer.configure(function () {
    /**
     * Your express or connect stack
     */
    consumer.use(twitterEveryauth.getMiddleware());
    /**
    * Your express or connect stack
    */
});

consumer.get('/', function (request, response) {
    /*Your turn!*/
});

consumer.listen(/*Add here your consumers port.*/);