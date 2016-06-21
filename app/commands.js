module.exports = (controller) => {

    controller.on('slash_command', (bot, msg) => {

        switch (msg.subcommand) {
            // If adding new commands add a corresponding help entry.
            case 'help':
                require('./subcommands/help')(bot, msg);
                break;

            // Add commands here
            case 'calculate':
                require('./subcommands/calculate')(bot, msg);
                break;
            case 'qlikify':
                require('./subcommands/qlikify')(bot, msg);
                break;

                
            default:
                bot.replyPrivate(msg, 'Whoops, I did not understand that command. Try /help');

        };

    });

};