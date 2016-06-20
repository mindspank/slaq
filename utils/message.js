const extend = require('extend');

var base = {
    text: '',
    mrkdwn: true,
    attachments: []
}

module.exports = {
    inChannel: function(text) {
        var msg = extend(base,{
            text: text,
            response_type: "in_channel"
        });

        return msg;
    },
    inPrivate: function(text) {
        var msg = extend(base,{
            text: text
        });

        return msg;      
    }
}