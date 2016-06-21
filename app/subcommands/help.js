module.exports = (bot, msg) => {

    let commands = [
        'calculate <appid> <expression>'
    ].join('\n');

    bot.replyPrivate(msg, 'Available commands are: \n' + commands);
};