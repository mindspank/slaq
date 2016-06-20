const fs = require('fs');
const path = require('path');

var certPath = 'C:/ProgramData/Qlik/Sense/Repository/Exported Certificates/.Local Certificates'

module.exports = {
    host: 'localhost',
    port: 4747,
    isSecure: true,
    origin: 'https://localhost',
    headers: {
        'X-Qlik-User': 'UserDirectory=Internal;UserId=sa_repository'
    },
    key: fs.readFileSync('client_key.pem'),
    cert: fs.readFileSync('client.pem'),
    rejectUnauthorized: false
}