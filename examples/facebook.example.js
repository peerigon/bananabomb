"use strict";
//
//var facebook        = require("../lib/index").facebook,
//    everyauth       = require("everyauth"),
//    express         = require("express"),
//    uberspaceTools  = require('./uberspaceTools'),
//    error,
//    success,
//    status;
//
//var facebookConsumer = new facebook.Consumer(155206961266142, '3ff722ab6ed73b55ad6f918ffbaff3a7');
//var facebookEveryauth = new facebook.Everyauth(everyauth, facebookConsumer);
//
//function onFacebookEveryauthData(session, userAccessToken, userAccessTokExtra, facebookUserData) {
//    
//    var facebookUser = new facebook.User({
//  "id": "100003502070751",
//  "name": "Matthias Ja",
//  "first_name": "Matthias",
//  "last_name": "Ja",
//  "link": "http://www.facebook.com/profile.php?id=100003502070751",
//  "gender": "male",
//  "email": "fb@slackline-set.eu",
//  "timezone": 2,
//  "locale": "de_DE",
//  "verified": true,
//  "updated_time": "2012-02-22T12:44:36+0000",
//  "type": "user"
//})
//        .setAccessToken("AAACNKOZCKZCd4BAIdTGjhZB4JrxSsvNG8fTUaEK87NiFv8xuBjmtkVpp46kuwghZB1YioVfVdvgR3Ck9UaaZC8tAN62kF2DcMUVsu3p6cHwZDZD")
//        .setAccessTokExtra({ expires: '5183895' });
//
//    /**
//     * Create the Twitter-REST-Client. It needs the user credentials and consumer credentials to authenticate the
//     * requests.
//     */
//    var statusMachine = new facebook.GraphApi(facebookUser, facebookConsumer);
// 
//   /**
//     * Let's post a tweet now.
//     */
////    statusMachine.postStatus(
////        function() { /*Error callback*/ },
////        function() { /*Success callback*/ },
////        "Hello, Arjun. I like this new API."
////    );
//        
//    statusMachine.getStatuses(
//        function() { },
//        function() { }
//    )
//        
//    statusMachine.deleteStatus(
//        function() { },
//        function() { },
//        142779165848818
//    )
//    
//    return session;
//}
//
//onFacebookEveryauthData();


//
//function onFacebookEveryauthError(error) {
//    console.log(error);
//    //Some cool error handling
//}
//
//facebookEveryauth.on("data", onFacebookEveryauthData).on("error", onFacebookEveryauthError);
//
///**
// * Creating an express-based app-stack.
// */
//var consumerApp = express.createServer();
//consumerApp.configure(function () {
//    /**
//     * Put here your express/connect stack
//     */
//    consumerApp.use(uberspaceTools.rewriteHost());
//    consumerApp.use(express.bodyParser());
//    consumerApp.use(express.cookieParser());
////    consumerApp.use(express.session({secret: "aVerySecretSecret"}));
//    //Redirects to twitter if the request is targeting the following url: your.base.url/auth/twitter
//    consumerApp.use(facebookEveryauth.getMiddleware());
//    /**
//    * Put here your express/connect stack
//    */
//    consumerApp.use(express.errorHandler());
//});
//
//consumerApp.get('/', function (request, response) {
//    response.send("Hello matthaias!");
//    console.log(request);
//    console.log(response);
//    /*Your turn!*/
//});
//
//consumerApp.listen(20005);



var everyauth   = require('everyauth'),
    express     = require('express'),
    uberspaceTools = require('./uberspaceTools'),
    app;

everyauth.facebook
    .appId(155206961266142)
    .appSecret('3ff722ab6ed73b55ad6f918ffbaff3a7')
    .handleAuthCallbackError( function (req, res) {
        console.log(req, res);
    })
    .findOrCreateUser( function (session, accessToken, accessTokExtra, fbUserMetadata) {
    // find or create user logic goes here
    
//    console.log(session, "\n");
    console.log(accessToken, "\n");
    console.log(accessTokExtra, "\n");
    console.log(fbUserMetadata);
    
    return fbUserMetadata; 
})
    .redirectPath('/')
    .scope('user_status,publish_stream,email');
 

app = express.createServer();
app.configure(function () {
   app.use(uberspaceTools.rewriteHost());
   app.use(express.bodyParser());
   app.use(express.cookieParser());
   app.use(express.session({secret: 'whodunnit'}));
   app.use(everyauth.middleware());
   //app.router(routes);
}).listen(20005);

app.get("/", function(request,result) {
    result.send("Hello matthaias!");
});
    