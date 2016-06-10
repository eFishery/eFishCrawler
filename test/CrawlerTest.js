require('dotenv').config();

var should          = require('chai').should();
var expect          = require("chai").expect;
var Crawler          = require("../libs/Crawler");

describe('Crawler eFish', function() {
	var crawler;
	var consumer_key = process.env.CONSUMER_KEY;
	var consumer_secret = process.env.CONSUMER_SECRET;
	it('should be generate engine', function(){
		crawler = new Crawler(consumer_key, consumer_secret);
		expect(crawler).to.be.an('object');
		expect(crawler.getAccessToken).to.be.an('function');
	});
	it('should be return access token');
})