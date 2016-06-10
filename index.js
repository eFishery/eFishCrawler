var OAuth = require('oauth');
var fs = require('fs');

var oa = new OAuth.OAuth(
  'https://oauth.8villages.com/tokens/request-token',
  "https://accounts.8villages.com/authentication",
  'qRh0qh_hS5-51QuvZ3KUsCBuzvk.',
  '0naobGZ41ow-0ZaKY4LU6nooy1cLUCa0T-AiwiFa0Qg.',
  '1.0',
  null,
  'HMAC-SHA1'
);

oa.getOAuthRequestToken(function(error, oauth_token, oauth_token_secret, results){
  if(error) {
  	console.error(error);
  } else { 
	//
	var post_body = {
		requestToken:oauth_token,
		identifier:"admin@efish.com",
		password:"kalimalang",
	};
	oa.post("https://accounts.8villages.com/authentication",oauth_token,oauth_token_secret,post_body,function(status,data,res){
		var parsed = JSON.parse(data);
		var oauth_access_token = parsed.accessToken.key;
		var oauth_access_token_secret = parsed.accessToken.secret;
		//
		// oa.getProtectedResource("https://conversation.8villages.com/1.0/contents/articles", "GET", oauth_access_token, oauth_access_token_secret,  function (error, data, response) {
		// 	var parsedData = JSON.parse(data);
		// 	console.log(parsedData);
		// 	fs.writeFile('./articles.json', data, function(err) {
		//     	if (err) return console.error(err);
		//     });
		// });
		// oa.getProtectedResource("https://conversation.8villages.com/1.0/contents/questions", "GET", oauth_access_token, oauth_access_token_secret,  function (error, data, response) {
		// 	var parsedData = JSON.parse(data);
		// 	console.log(parsedData);
		// 	fs.writeFile('./questions.json', data, function(err) {
		//     	if (err) return console.error(err);
		//     });
		// });
		// oa.getProtectedResource("https://conversation.8villages.com/1.0/contents/tips", "GET", oauth_access_token, oauth_access_token_secret,  function (error, data, response) {
		// 	var parsedData = JSON.parse(data);
		// 	console.log(parsedData);
		// 	fs.writeFile('./tips.json', data, function(err) {
		//     	if (err) return console.error(err);
		//     });
		// });
		// oa.getProtectedResource("https://conversation.8villages.com/1.0/contents/forums", "GET", oauth_access_token, oauth_access_token_secret,  function (error, data, response) {
		// 	var parsedData = JSON.parse(data);
		// 	console.log(parsedData);
		// 	fs.writeFile('./forums.json', data, function(err) {
		//     	if (err) return console.error(err);
		//     });
		// });
		// oa.getProtectedResource("https://conversation.8villages.com/1.0/content/5758e153c1719b9c04b6615f", "GET", oauth_access_token, oauth_access_token_secret,  function (error, data, response) {
		// 	var parsedData = JSON.parse(data);
		// 	console.log(parsedData);
		// 	fs.writeFile('./examples-data/object-article.json', data, function(err) {
		//     	if (err) return console.error(err);
		//     });
		// });
	});
  }
});