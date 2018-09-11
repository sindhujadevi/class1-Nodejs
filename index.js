/*
* Primary file for the API

*/

// Dependencies
var http = require('http');
var url = require('url');
var StringDecoder = require('string_decoder').StringDecoder;
var config = require('./config');

//server
var server = http.createServer(function(req,res){

		var parsedUrl = url.parse(req.url,true);
		var path = parsedUrl.pathname;
		var trimmedPath = path.replace(/^\/+|\/+$/g,'');
		var method = req.method.toLowerCase();
//query string as an object
		var queryStringObject = parsedUrl.query;
//Headers
		var headers = req.headers;
//payloads
		var decoder = new StringDecoder('utf-8');
		var buffer = '';
		req.on('data',function(data){
			buffer +=decoder.write(data);
		});
		
		req.on('end',function(){
			buffer +=decoder.end();
		//chosenhandler
		var chosenHandler = typeof(router[trimmedPath]) !== 'undefined' ? router[trimmedPath]: handlers.notFound;
		var data = {
			'trimmedPath' : trimmedPath,
			'queryStringObject' : queryStringObject,
			'method' : method,
			'headers' : headers,
			'payloads' : buffer
			}
		chosenHandler(data,function(data, statusCode,payload){
			statusCode = typeof(statusCode) == 'number' ? statusCode : 200;
			payload = typeof(payload) == 'object' ? payload : {};
		var payloadString = JSON.stringify(payload);
		res.setHeader('Content-Type','application/json');
		res.writeHead(statusCode);
		res.end(payloadString);	
		console.log('Returing these response:' ,statusCode,payloadString);

		});
//HTTP method

/*var method = req.method.toLowerCase();*/
		
		/*res.end('Hello World\n');*/
/*console.log('Request recieved with these headers:' ,headers);*/
		/*console.log('Request recieved with this payloads:' ,buffer);*/

   });

});	
//request router
	var handlers = {};
	handlers.sample = function(data,callback){
		callback(data, 406,{'message':'hello'});
	};
	handlers.notFound = function(data,callback){
		callback(404);
	};

	handlers.hello = function(data,callback) {
       callback(406,{'message':'welcome'});
	};
	var router = {
		'sample':handlers.sample,
		'hello' :handlers.hello
	};

/*console.log('Request recieved on path:'+trimmedPath+'with method:'+method+'with these query string parameters',queryStringObject);*/
server.listen(8000,function(){
	console.log("The server is listening on port 8000 now");
});
