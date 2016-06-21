var OAuth = require('oauth');
var fs = require('fs');
var Promise = require("bluebird");
var qs = require('querystring');

var url_request_token = 'https://oauth.8villages.com/tokens/request-token';
var url_access_token = 'https://accounts.8villages.com/authentication';
var url_auth = 'https://accounts.8villages.com/authentication';
var url_resource = 'https://conversation.8villages.com/1.0/contents/';
var url_single_resource = 'https://conversation.8villages.com/1.0/content/';

var extend = function (obj1,obj2) {
    var obj3 = {};
    for (var attrname in obj1) { obj3[attrname] = obj1[attrname]; }
    for (var attrname in obj2) { obj3[attrname] = obj2[attrname]; }
    return obj3;
}

var Engine = function(consumerKey,consumerSecret){
	this.oauth =new OAuth.OAuth(
	  url_request_token,
	  url_access_token,
	  consumerKey,
	  consumerSecret,
	  '1.0',
	  null,
	  'HMAC-SHA1'
	);
	this.oauth_access_token = null;
	this.oauth_access_token_secret = null;
};

Engine.prototype.getAccessToken = function(identifier, password, callback){
	var that = this;
	return new Promise(function(resolve, reject){
		that.oauth.getOAuthRequestToken(function(error, oauth_token, oauth_token_secret, results){
			if(error) {
				reject(error);
		  		if (typeof callback === 'function') callback(error);
			} else { 
				var post_body = {
					requestToken:oauth_token,
					identifier:identifier,
					password:password,
				};
				that.oauth.post(url_auth,oauth_token,oauth_token_secret,post_body,function(status,data,res){
					var parsed = JSON.parse(data);
					that.oauth_access_token = parsed.accessToken.key;
					that.oauth_access_token_secret = parsed.accessToken.secret;
					resolve({
						token:that.oauth_access_token,
						secret:that.oauth_access_token_secret
					});
					if (typeof callback === 'function') callback(null,that.oauth_access_token,that.oauth_access_token_secret);
				});
			}
		});
	});
};

Engine.prototype.getContents = function(objectType, paramFilter, paramSort, callback){
	var that = this;
	return new Promise(function(resolve, reject){
		var url_to_get = (objectType) ? url_resource + objectType : url_resource;
		url_to_get += '?';
		var paramAll = extend(paramFilter,paramSort);
		if (paramAll) url_to_get += qs.stringify(paramAll);
		that.oauth.getProtectedResource(url_to_get, "GET", that.oauth_access_token, that.oauth_access_token_secret,  function (error, data, response) {
			if(error) {
				reject(error);
		  		if (typeof callback === 'function') callback(error);
			} else { 
				var parsedData = JSON.parse(data);
				resolve(parsedData)
				if (typeof callback === 'function') callback(null, parsedData);
			}
		});
	});
};

Engine.prototype.getArticles = function(paramFilter, paramSort, callback){
	var that = this;
	return that.getContents('articles', paramFilter, paramSort, callback);
};

Engine.prototype.getQuestions = function(paramFilter, paramSort, callback){
	var that = this;
	return that.getContents('questions', paramFilter, paramSort, callback);
};

Engine.prototype.getTips = function(paramFilter, paramSort, callback){
	var that = this;
	return that.getContents('tips', paramFilter, paramSort, callback);
};

Engine.prototype.getForums = function(paramFilter, paramSort, callback){
	var that = this;
	return that.getContents('forums', paramFilter, paramSort, callback);
};

Engine.prototype.getContentById = function(objectId, callback){
	var that = this;
	return new Promise(function(resolve, reject){
		var url_to_get = url_single_resource + objectId; 
		that.oauth.getProtectedResource(url_to_get, "GET", that.oauth_access_token, that.oauth_access_token_secret,  function (error, data, response) {
			if(error) {
				reject(error);
		  		if (typeof callback === 'function') callback(error);
			} else { 
				var parsedData = JSON.parse(data);
				resolve(parsedData)
				if (typeof callback === 'function') callback(null, parsedData);
			}
		});
	});
};

module.exports = Engine;