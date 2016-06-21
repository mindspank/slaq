module.exports = (bot, msg) => {

    let commands = [
        'calculate <appid> <expression>',
        'qlikify <sentence>'
    ].join('\n');

    bot.replyPrivate(msg, 'Available commands are: \n' + commands);
};