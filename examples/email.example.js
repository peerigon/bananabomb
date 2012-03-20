"use strict";

/**
 * Require all the stuff.
 */
var email = require("../lib").email;

/**
 * Create an instance of SMTPSettings and configure it.
 */
var smtpSettings = new email.SMTPSettings();

smtpSettings
    //.enableDebugMode() //Output some debbuging stuff via console.
    //.enableSecureConnection() //Use SSL.
    .setPort(587)
    .setHost("smtp.yourBelovedHost.er")
    .setUserName("YourFancyUserName")
    .setPassword("UltraSecurePW");

/**
 * Create an instance of EMail and configure it.
 */
var eMail = new email.EMail();
//eMail.setTo() There is no need to call this function manually.
eMail
    .setFrom("spam@mast.er")
    .setSubject("This is the fucking most important message you've ever had received!")
    .setMessage(
        "<h1> Oh wow look how important this message is! </h1>" +
        "<p> Blah Blah Blih Blub</p>" +
        "<p>End of message</p>"
    );

/**
 * Create an instance of SMTPClient and send the mails.
 */
var smtpClient = new email.SMTPClient(smtpSettings, eMail);

function onSendAll(failed, send) {
    console.log("Failed:", failed);
    console.log("Send:", send);
    smtpClient.closeSocket();
}

smtpClient
    .openSocket()
    .sendEmails([/*thousand of mails*/], onSendAll);
