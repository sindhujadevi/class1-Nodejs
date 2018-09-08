/*
*configuration variables
*/
/*var environments = {}
//staging environments
environments.staging ={
		'port':300,
		'envName':'staging'
};
//production environments
environments.production ={
		'port': 404,
		'envName':'production'
};
 //commandline argument
var CurrentEnvironment = typeof(process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV toLowerCase()
//checking the current environment
var environmentToExport = typeof(environment[CurrentEnvironment]) == 'object' ? environment[CurrentEnvironment]:environments.staging;

//export the module
module.exports = environmentToExport;*/
