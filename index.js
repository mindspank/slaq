const restify = require('restify');
const qsocks = require('qsocks');

var server = restify.createServer({
  name: 'slaq',
  version: '1.0.0'
});

server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());

server.post('/', function (req, res, next) {
/*
token=gIkuvaNzQIHg97ATvDxqgjtO
team_id=T0001
team_domain=example
channel_id=C2147483705
channel_name=test
user_id=U2147483697
user_name=Steve
command=/weather
text=94070
response_url=https://hooks.slack.com/commands/1234/5678
*/
  const command = req.params.text.split(' ');

  switch (command[0]) {

    case 'calculate':
        require('./plugins/calculate')(req, res, next);
        break;
    case 'help':
        break;
    default:
        res.send('Whoops, I can\'t handle that request :cry:\mTry /slaq help')

  };

});

server.listen(8080, function () {
  console.log('%s listening at %s', server.name, server.url);
});