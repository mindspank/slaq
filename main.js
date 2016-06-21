const dotenv = require('dotenv');
const Botkit = require('botkit');

dotenv.load();


// Load up botkit
require('./app/botkit');


/*
var controller = Botkit.slackbot({})
    .configureSlackApp({
        clientId: process.env.clientId,
        clientSecret: process.env.clientSecret,
        scopes: ['commands']
    });

controller.setupWebserver(process.env.port,function(err,webserver) {

  controller.createWebhookEndpoints(controller.webserver);

  controller.createOauthEndpoints(controller.webserver,function(err,req,res) {
    if (err) {
      res.status(500).send('ERROR: ' + err);
    } else {
      res.send('Success!');
    }
  });
});

controller.on('slash_command',function(bot,message) {

  bot.replyPublic(message,'<@' + message.user + '> is cool!');
  bot.replyPrivate(message,'*nudge nudge wink wink*');

});
*/