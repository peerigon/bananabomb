"use strict"; // run code in ES5 strict mode

/**
 * Require all of the needed shizzle.
 * Actually you don't need everyauth or express to use bananabomb.
 * But both modules are used here in the example to demonstrate how to get user credentials from Twitter.
 */
var twitter     = require("../lib/index").twitter,
    everyauth   = require("everyauth"),
    express     = require("express");

/**
 * At first you need to create an instance of TwitterConsumer which is a represantation of your consumer (app);
 * Provide your cosumerKey and consumerSecert which you'll get from Twitter after you have created an app.
 * @see https://dev.twitter.com/apps/
 */
var twitterConsumer = new twitter.Consumer(/*consumerKey,*//*consumerSecret*/);

/**
 * If you haven't already received all needed credentials you can use TwitterEveryauth to make your live easier.
 * For further information checkout the everyauth documentation.
 * @see https://github.com/bnoguchi/everyauth
 * Keep in mind that you don't need to use everyauth.
 * Take also a closer look at:
 * @see https://github.com/ciaranj/node-oauth
 * @see http://passportjs.org/guide/twitter.html
 */
var twitterEveryauth = new twitter.Everyauth(everyauth, twitterConsumer);

/**
 * TwitterEveryauth is emitting "data" and "error" events.
 */
function onTwitterEveryauthData(session, userAccessToken, userAccessTokenSecret, twitterUserData) {
    var twitterUser = new twitter.User(twitterUserData)
        .setAccessToken(userAccessToken)
        .setAccessTokenSecret(userAccessTokenSecret);

    /**
     * Create the Twitter-REST-Client. It needs the user credentials and consumer credentials to authenticate the
     * requests.
     */
    var tweetMachine = new twitter.RESTClient(twitterUser, twitterConsumer);

    /**
     * Let's post a tweet now.
     */
    tweetMachine.postTweet(
        function() { /*Error callback*/ },
        function() { /*Success callback*/ },
        "Let's code object oriented!",
        {"include_entities": true}
    );
}

function onTwitterEveryauthError(error) {
    console.log(error);
    //Some cool error handling
}

twitterEveryauth.on("data", onTwitterEveryauthData).on("error", onTwitterEveryauthError);

/**
 * Creating an express-based app-stack.
 */
var consumerApp = express.createServer();
consumerApp.configure(function () {
    /**
     * Put here your express/connect stack
     */
    consumerApp.use(express.bodyParser());
    consumerApp.use(express.cookieParser());
    consumerApp.use(express.session({secret: "aVerySecretSecret"}));
    //Redirects to twitter if the request is targeting the following url: your.base.url/auth/twitter
    consumerApp.use(twitterEveryauth.getMiddleware());
    /**
    * Put here your express/connect stack
    */
    consumerApp.use(express.errorHandler());
});

consumerApp.get('/', function (request, response) {
    /*Your turn!*/
});

consumerApp.listen(/*Add here your consumers port.*/);