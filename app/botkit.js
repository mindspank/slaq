const Botkit = require('botkit');

const controller = Botkit.slackbot({
    debug: true
});

controller.spawn();

//Fix for https://github.com/howdyai/botkit/issues/108
controller.storage.teams.save({ id: process.env.slack_token, foo: "bar" }, (err) => {
    if (err) console.error(err);
});

controller.setupWebserver(process.env.port, (err, webserver) => {
    controller.createWebhookEndpoints(webserver);
});

// Set up middleware
controller.middleware.receive.use(function(bot, msg, next) {
    
    if(msg.type === 'slash_command' && msg.text) {
        const command = msg.text.split(' ');
        msg.subcommand = command[0];

        if( msg.text.split(' ').length > 1 ) {
            msg.text = msg.text.split(' ');
        }

    };
    next();
});

// slash commands
require('./commands');

module.exports = controller;