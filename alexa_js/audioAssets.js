'use strict';

var request = require('sync-request');
var xml2js = require('xml2js');
var res = request('GET',"https://www.kadachepta.com/feed/podcast");
var parseString = xml2js.parseString;
var audioData = [];

parseString(res.getBody(), function(err,result){
        var stories = result['rss']['channel'][0]['item'];

		// console.log("Total stories: " + stories.length);

		stories.forEach(function(entry) {
			var singleObj = {}
			singleObj['title'] = entry['title'][0];
			singleObj['description'] = entry['description'][0];
//			console.log(singleObj['title']);
//			console.log(singleObj['description']);
			singleObj['url'] = entry['enclosure'][0].$.url.replace("http:", "https:");
//			console.log(singleObj['url']);
			audioData.push(singleObj);
		});
});
console.log(audioData);
module.exports = audioData;