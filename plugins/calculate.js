'use strict';

const qsocks = require('qsocks');
const config = require('../config');
const Promise = require('bluebird');
const msg = require('../utils/message');


function isBlank(str) {
    return (!str || /^\s*$/.test(str));
}

module.exports = function (req, res, next) {

    const params = req.params.text.split(/\s+/);
    const appid = params[1];
    const expression = params.split(appid).join(' ');
    const guidCheck = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    isGuid = guidCheck.test(appid);

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
            app.connection.ws.terminate();
            hub.then(hub => connection.ws.terminate());

            return result;
        })

    })
    .then(result => {
        var text = msg('The expression *' + expression + '* equals *' + result + '*').inChannel().getText()
        res.send(text);
    })
    .catch(err => {
        var text = msg(err).inPrivate().getText();
        res.send(text);
    }).done();

};