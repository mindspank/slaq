module.exports = (bot, msg) => {

    if( Array.isArray(msg.text) ) {
        let sentence = msg.text.slice(1).join(' ');
        sentence = sentence.replace(/ck/gi, 'q')
        sentence = sentence.replace(/c/gi, 'q')
        sentence = sentence.replace(/k/gi, 'q')

        bot.replyPublic(msg, sentence);

    } else {
        bot.replyPrivate(msg, 'Add a sentence you want me to Qlikify!');
    }

}