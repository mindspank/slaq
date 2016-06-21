const extend = require('extend');

const msg = (text) => {

    var base = {
        text: text || '',
        response_type: 'ephemeral',
        mrkdwn: true,
        attachments: []        
    };

    return internal = {
        getText: () => {
            return base;
        },
        base: (text) => {
            base.text = text;
            return internal;
        },
        setText: (text) => {
            base.attachment.push({
                text: text
            });
            return internal;
        },
        removeText: (index) => {
            base.attachments.splice(index, 1);
            return internal;
        },
        inChannel: () => {
            base.response_type = 'in_channel';
            return internal;
        },
        inPrivate: () => {
            base.response_type = 'ephemeral';
            return internal;
        }
    }
    
};

module.exports = msg;