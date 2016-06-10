var MySQL = require('mysql')
var _ = require("lodash")
var sugar = require("sugar")
var Throttle = require('throttle-exec')
var Promise = require('bluebird')
var fs = require('fs');

var Config = {
	mysql:{
		host:process.env.DB_HOST,
		user:process.env.DB_USER,
		password:process.env.DB_PASS,
		database:process.env.DB_NAME,
		multiple_statement:(process.env.DB_MULTIPLE === "true"),
		throttle_count:parseInt(process.env.DB_THROTTLE) || 25,
	}
};

var Connection,connReady;
var isInit = false;
var throttleCount = Config.mysql.throttle_count;

var Engine = {}

function init(){
	Connection = MySQL.createConnection({
		host: Config.mysql.host,
		user: Config.mysql.user,
		password: Config.mysql.password,
		database: Config.mysql.database,
		multipleStatements:Config.mysql.multiple_statement
	})
	connReady = new Promise(function(resolve, reject) {
		Connection.connect(function(err) {
			if (err) {
				reject(err)
			} else {
				resolve();
			}
		})
	})
}

function query(queryStr, params) {
	return new Promise(function(resolve,reject){
		connReady.then(function(){
			try{
				Connection.query(queryStr,params,function(err,results){
					if(err){
						reject(err)
					}else{
						resolve(results)
					}
				})	
			}catch(e){
				reject(err);
			}
		})
	})
}

var ThrottleInstance = new Throttle(throttleCount)
ThrottleInstance.registerFunction("query",query)

Engine.query = function(queryStr,params){
	if(!isInit){
		isInit = true;
		init()
	}
	return ThrottleInstance.registerAction("query",[queryStr,params])
}

Engine.showEnvironment = function(){
	return process.env.APP_ENV;
}

Engine.getDBConfig = function(){
	return Config.mysql;
}

Engine.runSqlFile = function(filePath){
	return new Promise(function(resolve,reject){
		fs.readFile(filePath,function(err,data){
			if(err){
				reject(err)
			}else{
				ThrottleInstance.registerAction("query",[data.toString()]).then(function(results){
					resolve(results)
				}).catch(function(err){reject(err)})
			}
		})
	})
}

module.exports = Engine;