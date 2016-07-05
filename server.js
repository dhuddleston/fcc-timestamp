'use strict';

var express = require('express');
var moment = require('moment');

const app = express();

app.use(express.static(__dirname + '/public'));

app.get('/:timestamp', function(req, res){
	// Determine if the input is valid, and if it is a Unix timestamp or Natural timestamp
	var timestamp;
	if(moment(req.params.timestamp, "MMMM D, YYYY", true).isValid())
	{
		timestamp = moment(req.params.timestamp, "MMMM D, YYYY");
		res.json({
			unix:timestamp.format("X"),
			natural:timestamp.format("MMMM D, YYYY")
		});		
	}
	else if(moment(req.params.timestamp, "X", true).isValid())
	{
		timestamp = moment(req.params.timestamp, "X");
		res.json({
			unix:timestamp.format("X"),
			natural:timestamp.format("MMMM D, YYYY")
		});
	}
	else
	{
		res.json({
			unix:null,
			natural:null,
		});
	}
});

var port = process.env.PORT || 8080;
app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});