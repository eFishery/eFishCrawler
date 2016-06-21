require('dotenv').config();

var should          = require('chai').should();
var expect          = require("chai").expect;
var Crawler          = require("../libs/Crawler");

describe('Crawler eFish', function() {
	var crawler;
	var consumer_key = process.env.CONSUMER_KEY;
	var consumer_secret = process.env.CONSUMER_SECRET;
	var consumer_identifier = process.env.CONSUMER_IDENTIFIER;
	var consumer_password = process.env.CONSUMER_PASSWORD;
	it('should be generate engine', function(){
		crawler = new Crawler(consumer_key, consumer_secret);
		expect(crawler).to.be.an('object');
		expect(crawler.getAccessToken).to.be.an('function');
	});
	it('should be return access token', function(done){
		crawler.getAccessToken(consumer_identifier,consumer_password)
			.then(function(oauth){
				expect(oauth).to.be.an('object');
				expect(oauth).to.have.ownProperty('token');
				expect(oauth).to.have.ownProperty('secret');
				expect(crawler.oauth_access_token).to.be.an('string');
				expect(crawler.oauth_access_token_secret).to.be.an('string');
				done();
			})
			.catch(function(err){
				console.error(err);
				done();
			});
	});
	it('should be get contents', function(done){
		crawler.getContent()
			.then(function(contents){
				expect(contents).to.be.an('object');
				expect(contents).to.have.ownProperty('totalRecords');
				expect(contents.totalRecords).to.be.an('number');
				expect(contents).to.have.ownProperty('totalDisplay');
				expect(contents.totalDisplay).to.be.an('number');
				expect(contents).to.have.ownProperty('data');
				expect(contents).to.have.ownProperty('hasNext');
				//data
				expect(contents.data[0]).to.have.ownProperty('type');
				expect(contents.data[0]).to.have.ownProperty('conversationId');
				expect(contents.data[0]).to.have.ownProperty('state');
				expect(contents.data[0]).to.have.ownProperty('privacy');
				expect(contents.data[0]).to.have.ownProperty('privacy');
				expect(contents.data[0]).to.have.ownProperty('title');
				expect(contents.data[0]).to.have.ownProperty('content');
				expect(contents.data[0]).to.have.ownProperty('summary');
				expect(contents.data[0]).to.have.ownProperty('attachment');
				expect(contents.data[0]).to.have.ownProperty('tags');
				done();
			})
			.catch(function(err){
				console.error(err);
				done();
			});
	});
	it('should be get specific contents articles', function(done){
		crawler.getArticles()
			.then(function(contents){
				expect(contents).to.be.an('object');
				expect(contents).to.have.ownProperty('totalRecords');
				expect(contents.totalRecords).to.be.an('number');
				expect(contents).to.have.ownProperty('totalDisplay');
				expect(contents.totalDisplay).to.be.an('number');
				expect(contents).to.have.ownProperty('data');
				expect(contents).to.have.ownProperty('hasNext');
				//data
				expect(contents.data[0]).to.have.ownProperty('type');
				expect(contents.data[0]).to.have.ownProperty('conversationId');
				expect(contents.data[0]).to.have.ownProperty('state');
				expect(contents.data[0]).to.have.ownProperty('privacy');
				expect(contents.data[0]).to.have.ownProperty('title');
				expect(contents.data[0]).to.have.ownProperty('content');
				expect(contents.data[0]).to.have.ownProperty('summary');
				expect(contents.data[0]).to.have.ownProperty('attachment');
				expect(contents.data[0]).to.have.ownProperty('tags');
				done();
			})
			.catch(function(err){
				console.error(err);
				done();
			});
	});
	it('should be get specific contents questions', function(done){
		crawler.getQuestions()
			.then(function(contents){
				expect(contents).to.be.an('object');
				expect(contents).to.have.ownProperty('totalRecords');
				expect(contents.totalRecords).to.be.an('number');
				expect(contents).to.have.ownProperty('totalDisplay');
				expect(contents.totalDisplay).to.be.an('number');
				expect(contents).to.have.ownProperty('data');
				expect(contents).to.have.ownProperty('hasNext');
				//data
				expect(contents.data[0]).to.have.ownProperty('type');
				expect(contents.data[0]).to.have.ownProperty('conversationId');
				expect(contents.data[0]).to.have.ownProperty('state');
				expect(contents.data[0]).to.have.ownProperty('privacy');
				expect(contents.data[0]).to.have.ownProperty('title');
				expect(contents.data[0]).to.have.ownProperty('content');
				expect(contents.data[0]).to.have.ownProperty('summary');
				expect(contents.data[0]).to.have.ownProperty('attachment');
				expect(contents.data[0]).to.have.ownProperty('tags');
				done();
			})
			.catch(function(err){
				console.error(err);
				done();
			});
	});
it('should be get specific contents tips', function(done){
		crawler.getTips()
			.then(function(contents){
				expect(contents).to.be.an('object');
				expect(contents).to.have.ownProperty('totalRecords');
				expect(contents.totalRecords).to.be.an('number');
				expect(contents).to.have.ownProperty('totalDisplay');
				expect(contents.totalDisplay).to.be.an('number');
				expect(contents).to.have.ownProperty('data');
				expect(contents).to.have.ownProperty('hasNext');
				//data
				if (contents.data[0]){
					expect(contents.data[0]).to.have.ownProperty('type');
					expect(contents.data[0]).to.have.ownProperty('conversationId');
					expect(contents.data[0]).to.have.ownProperty('state');
					expect(contents.data[0]).to.have.ownProperty('privacy');
					expect(contents.data[0]).to.have.ownProperty('title');
					expect(contents.data[0]).to.have.ownProperty('content');
					expect(contents.data[0]).to.have.ownProperty('summary');
					expect(contents.data[0]).to.have.ownProperty('attachment');
					expect(contents.data[0]).to.have.ownProperty('tags');
				}
				done();
			})
			.catch(function(err){
				console.error(err);
				done();
			});
	});
	it('should be get specific contents forums', function(done){
		crawler.getForums()
			.then(function(contents){
				expect(contents).to.be.an('object');
				expect(contents).to.have.ownProperty('totalRecords');
				expect(contents.totalRecords).to.be.an('number');
				expect(contents).to.have.ownProperty('totalDisplay');
				expect(contents.totalDisplay).to.be.an('number');
				expect(contents).to.have.ownProperty('data');
				expect(contents).to.have.ownProperty('hasNext');
				//data
				if (contents.data[0]){
					expect(contents.data[0]).to.have.ownProperty('type');
					expect(contents.data[0]).to.have.ownProperty('conversationId');
					expect(contents.data[0]).to.have.ownProperty('state');
					expect(contents.data[0]).to.have.ownProperty('privacy');
					expect(contents.data[0]).to.have.ownProperty('title');
					expect(contents.data[0]).to.have.ownProperty('content');
					expect(contents.data[0]).to.have.ownProperty('summary');
					expect(contents.data[0]).to.have.ownProperty('attachment');
					expect(contents.data[0]).to.have.ownProperty('tags');
				}
				done();
			})
			.catch(function(err){
				console.error(err);
				done();
			});
	});
	it('should be get contents with params filter', function(done){
		var param_filters = {
			tags:"lele"
		};
		crawler.getContent(null,param_filters)
			.then(function(contents){
				expect(contents).to.be.an('object');
				expect(contents).to.have.ownProperty('totalRecords');
				expect(contents.totalRecords).to.be.an('number');
				expect(contents).to.have.ownProperty('totalDisplay');
				expect(contents.totalDisplay).to.be.an('number');
				expect(contents).to.have.ownProperty('data');
				expect(contents).to.have.ownProperty('hasNext');
				//data
				if (contents.data[0]){
					expect(contents.data[0]).to.have.ownProperty('type');
					expect(contents.data[0]).to.have.ownProperty('conversationId');
					expect(contents.data[0]).to.have.ownProperty('state');
					expect(contents.data[0]).to.have.ownProperty('privacy');
					expect(contents.data[0]).to.have.ownProperty('privacy');
					expect(contents.data[0]).to.have.ownProperty('title');
					expect(contents.data[0]).to.have.ownProperty('content');
					expect(contents.data[0]).to.have.ownProperty('summary');
					expect(contents.data[0]).to.have.ownProperty('attachment');
					expect(contents.data[0]).to.have.ownProperty('tags');
					expect(contents.data[0].tags).to.be.an('array');
					expect(contents.data[0].tags).to.include("Lele");
				}
				done();
			})
			.catch(function(err){
				console.error(err);
				done();
			});
	});
	it('should be get contents with params sorting', function(done){
		var param_sorts = {
			dateSubmitted:"desc"
		};
		crawler.getContent(null,null,param_sorts)
			.then(function(contents){
				expect(contents).to.be.an('object');
				expect(contents).to.have.ownProperty('totalRecords');
				expect(contents.totalRecords).to.be.an('number');
				expect(contents).to.have.ownProperty('totalDisplay');
				expect(contents.totalDisplay).to.be.an('number');
				expect(contents).to.have.ownProperty('data');
				expect(contents).to.have.ownProperty('hasNext');
				//data
				if (contents.data[0]){
					expect(contents.data[0]).to.have.ownProperty('type');
					expect(contents.data[0]).to.have.ownProperty('conversationId');
					expect(contents.data[0]).to.have.ownProperty('state');
					expect(contents.data[0]).to.have.ownProperty('privacy');
					expect(contents.data[0]).to.have.ownProperty('privacy');
					expect(contents.data[0]).to.have.ownProperty('title');
					expect(contents.data[0]).to.have.ownProperty('content');
					expect(contents.data[0]).to.have.ownProperty('summary');
					expect(contents.data[0]).to.have.ownProperty('attachment');
					expect(contents.data[0]).to.have.ownProperty('tags');
				}
				done();
			})
			.catch(function(err){
				console.error(err);
				done();
			});
	});
})