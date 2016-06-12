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
			});
	});
	it('should be get contents');
	it('should be get specific contents');
	it('should be get specific contents with params filter');
	it('should be get specific contents with params sorting');
	it('should be get articles');
})