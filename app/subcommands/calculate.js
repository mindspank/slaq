'use strict';

const qsocks = require('qsocks');
const config = require('../../config');
const Promise = require('bluebird');

function isBlank(str) {
    return (!str || /^\s*$/.test(str));
}

module.exports = (bot, msg) => {

    const appid = msg.text[1];
    let expression = msg.text.slice(2).join(' ');
    
    if( appid && expression) {
        bot.replyPrivate(msg, 'Let me get right on that!');
    };

    var hub = qsocks.Connect(config);

    hub.then(global => {
        return global.getDocList()
    })
    .then(doclist => doclist.filter(d => d.qDocId === appid))
    .then(app => {
        if (!app.length) return Promise.reject('Sorry, could not find app');

        config.appname = appid;
        return qsocks.ConnectOpenApp(config);

    })
    .then(conn => {
        const app = conn[1];
        
        return app.checkExpression(expression)
        .then(result => {
            console.log(result)
            if (
                !isBlank(result.qErrorMsg) ||
                result.qBadFieldNames.length ||
                result.qDangerousFieldNames.length
            ) {
                return Promise.reject('Failed to parse expression, check your syntax noob')
            } else {
                return app.evaluate(expression);
            }
        })
        .then(result => {
            console.log(result)
            app.connection.ws.terminate();
            hub.then(hub => connection.ws.terminate());

            return result;
        })

    })
    .then(result => {
        bot.replyPrivateDelayed(msg, 'The expression *' + expression + '* equals *' + result + '*');
    })
    .catch(err => {
        bot.replyPrivateDelayed(msg, err);
    }).done();

};