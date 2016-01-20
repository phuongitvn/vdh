var Crawler = require('crawler');
var slug    = require('slug');
var async   = require('async');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ArticleUrlsModel   = require('./models/article_urls.js');
try{
	var c = new Crawler({
            'maxConnections': 10,
            'forceUTF8': true,
            'callback': function (error, result, $) {
            }
        });
		//var uri = 'http://suckhoe.vnexpress.net/tin-tuc/khoe-dep';
		var uri='http://suckhoe.vnexpress.net/tin-tuc/dinh-duong';
		c.queue([{
            'uri': uri,
            'callback': function (error, result, $) {
                var li = $('#news_home').children();
                var data = [];
                var obj = {};
                for(var i=0;i<li.length;i++){
					var item = $(li).eq(i);
					var data = [];
					obj 				= {};
					obj.title 			= item.find('h2.title_news a').text().trim();
					obj.slug 			= slug(obj.title);
					obj.url 			= item.find('h2.title_news a').attr('href');
					obj.thumb_url 		= item.find('.thumb img').attr('src');
					obj.intro_text 		= item.find('.news_lead').text();
					obj.created_time 	= new Date().toISOString();
					obj.status			= 0;
					obj.website			= uri;
					data.push(obj);
					//var logstr = obj.slug+"\n";
					//console.log(data);
					ArticleUrlsModel.insert(data);
                }
                //console.log(data);
                /*var where = {
                		slug: obj.slug
            	};
            	ArticleUrlsModel.findAll(where, function(result){
            		console.log('findSlug:'+result.length);
            		if(result.length<=0){}
            	});*/
                //ArticleUrlsModel.insert(data);
            }
        }]);
}catch(e)
{
	console.log(e);
}
