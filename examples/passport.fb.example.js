var express = require('express'),
passport = require('passport'),
util = require('util'),
FacebookStrategy = require('passport-facebook').Strategy,
uberspaceTools  = require('./uberspaceTools');

var FACEBOOK_APP_ID = "155206961266142"
var FACEBOOK_APP_SECRET = "3ff722ab6ed73b55ad6f918ffbaff3a7";


var facebook        = require("../lib/index").facebook;

var facebookUser = new facebook.User({
    "id": "100003502070751",
    "name": "Matthias Ja",
    "first_name": "Matthias",
    "last_name": "Ja",
    "link": "http://www.facebook.com/profile.php?id=100003502070751",
    "gender": "male",
    "email": "fb@slackline-set.eu",
    "timezone": 2,
    "locale": "de_DE",
    "verified": true,
    "updated_time": "2012-02-22T12:44:36+0000",
    "type": "user"
})
.setAccessToken("AAACNKOZCKZCd4BAIdTGjhZB4JrxSsvNG8fTUaEK87NiFv8xuBjmtkVpp46kuwghZB1YioVfVdvgR3Ck9UaaZC8tAN62kF2DcMUVsu3p6cHwZDZD")
.setAccessTokExtra({
    expires: '5183895'
});
var statusMachine = new facebook.GraphApi(facebookUser);

//statusMachine.postStatus(
//    function() { /*Error callback*/ },
//    function() { /*Success callback*/ },
//    "Hello, Arjun. I like this new API."
//);
//
//statusMachine.getStatuses(
//    function() {},
//    function() {}
//)

//statusMachine.deleteStatus(
//    function() { },
//    function() { },
//    143358729124195
//)
        


// Passport session setup.
// To support persistent login sessions, Passport needs to be able to
// serialize users into and deserialize users out of the session. Typically,
// this will be as simple as storing the user ID when serializing, and finding
// the user by ID when deserializing. However, since this example does not
// have a database of user records, the complete Facebook profile is serialized
// and deserialized.
passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(obj, done) {
    done(null, obj);
});


// Use the FacebookStrategy within Passport.
// Strategies in Passport require a `verify` function, which accept
// credentials (in this case, an accessToken, refreshToken, and Facebook
// profile), and invoke a callback with a user object.
passport.use(new FacebookStrategy({
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    //    callbackURL: "http://localhost:20005/auth/facebook/callback"
    callbackURL: "http://pandaa.taurus.uberspace.de/matthaias/bananabomb/auth/facebook/callback"
},
function(accessToken, refreshToken, profile, done) {
    // asynchronous verification, for effect...  
        console.log(accessToken, refreshToken, profile, done);
    
    process.nextTick(function () {
     
        // To keep the example simple, the user's Facebook profile is returned to
        // represent the logged-in user. In a typical application, you would want
        // to associate the Facebook account with a user record in your database,
        // and return that user instead.
        return done(null, profile);
    });
}
));




var app = express.createServer();

// configure Express
app.configure(function() {
    app.set('views', __dirname + '/views');
    app.set('view engine', 'ejs');
    app.use(express.logger());
    app.use(express.cookieParser());
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.session({
        secret: 'keyboard cat'
    }));
    // Initialize Passport! Also use passport.session() middleware, to support
    // persistent login sessions (recommended).
    app.use(passport.initialize());
    app.use(passport.session());
    //    app.use(app.router);
    //    app.use(express.static(__dirname + '/public'));
    app.use(uberspaceTools.rewriteHost());
});


app.get('/', function(req, res){
    res.render('index', {
        user: req.user
    });
});

app.get('/account', ensureAuthenticated, function(req, res){
    res.render('account', {
        user: req.user
    });
});

app.get('/login', function(req, res){
    res.render('login', {
        user: req.user
    });
});

// GET /auth/facebook
// Use passport.authenticate() as route middleware to authenticate the
// request. The first step in Facebook authentication will involve
// redirecting the user to facebook.com. After authorization, Facebook will
// redirect the user back to this application at /auth/facebook/callback
app.get('/auth/facebook',
    passport.authenticate('facebook', {
        scope: ['user_status', 'publish_stream']
    }),
    function(req, res){
    //        console.log(req, res);
    // The request will be redirected to Facebook for authentication, so this
    // function will not be called.
    });

// GET /auth/facebook/callback
// Use passport.authenticate() as route middleware to authenticate the
// request. If authentication fails, the user will be redirected back to the
// login page. Otherwise, the primary route function function will be called,
// which, in this example, will redirect the user to the home page.
app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
        failureRedirect: '/login'
    }),
    function(req, res) {
        res.redirect('/');
    });

app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});

app.listen(20005);


// Simple route middleware to ensure user is authenticated.
// Use this route middleware on any resource that needs to be protected. If
// the request is authenticated (typically via a persistent login session),
// the request will proceed. Otherwise, the user will be redirected to the
// login page.
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login')
}