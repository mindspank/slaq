const Botkit = require('botkit');

const controller = Botkit.slackbot({
    debug: true
});

// Start bot
controller.spawn();

// Fix for https://github.com/howdyai/botkit/issues/108
controller.storage.teams.save({ id: process.env.slack_token, foo: "bar" }, (err) => {
    if (err) console.error(err);
});

controller.setupWebserver(process.env.port, (err, webserver) => {
    controller.createWebhookEndpoints(webserver);
});

// Set up middleware
controller.middleware.receive.use((bot, msg, next) => {

    if( msg.type === 'slash_command' ) {

        const command = msg.text.split(' ');
        msg.subcommand = command[0].toLocaleLowerCase();

        
        if( msg.text.split(' ').length > 1 ) {
            msg.text = msg.text.split(' ');
        };

    };
    
    next();

});

// Load up slash commands
require('./commands')(controller);

module.exports = controller;
