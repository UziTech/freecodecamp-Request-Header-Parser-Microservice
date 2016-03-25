var express = require('express');
var requestIp = require('request-ip');
var userAgentParser = require('user-agent-parser');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(function (req, res) {
	var parser = new userAgentParser();
	var ua = req.headers['user-agent'];
	var info = {
		ipaddress: requestIp.getClientIp(req),
		language: req.headers["accept-language"],
		software: JSON.stringify(parser.setUA(ua).getResult())
	};
	res.json(info);
});

app.listen(app.get('port'), function () {
	console.log('Node app is running on port', app.get('port'));
});
