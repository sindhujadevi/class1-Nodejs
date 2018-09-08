/*
* Primary file for the API

*/

// Dependencies
var http = require('http');
var url = require('url');
var StringDecoder = require('string-decoder').StringDecoder;
var config = require('./config');

//server//
var server = http.createServer(function(req,res){

		var parsedUrl = url.parse(req.url,true);
		var path = parsedUrl.pathname;
		var trimmedPath = path.replace(/^\/+|\/+$/g,'');
//query string as an object//
		var queryStringObject = parsedUrl.query;
//Headers//
		var headers = req.headers;
//payloads//
		var decoder = new StringDecoder('utf-8');
		var buffer = '';
		req.on('data',function(data){
			buffer +=decoder.write(data);
		});
		
		req.on('end',function(){
			buffer +=decoder.end();
//HTTP method//
		var method = req.method.toLowerCase();
		
		res.end('Hello World\n');
		console.log('Request recieved with these headers:' ,headers);
		

		/*console.log('Request recieved on path:'+trimmedPath+'with method:'+method+'with these query string parameters',queryStringObject);*/
});
server.listen(250,function(){
	console.log("The server is listening on port 250 now");
});
