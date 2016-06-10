var OAuth = require('oauth');
var fs = require('fs');
var Promise = require("bluebird");

var url_request_token = 'https://oauth.8villages.com/tokens/request-token';
var url_access_token = 'https://accounts.8villages.com/authentication';
var url_auth = 'https://accounts.8villages.com/authentication';

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

Engine.prototype.getAccessToken = function(identifier,password,callback){
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

module.exports = Engine;