var Crawler = require('crawler');
var slug    = require('slug');
var async   = require('async');
var MongoClient = require('mongodb').MongoClient
	  , assert = require('assert');

try{
	var c = new Crawler({
            'maxConnections': 10,
            'forceUTF8': true,
            'callback': function (error, result, $) {
            }
        });
		c.queue([{
            'uri': 'http://suckhoe.vnexpress.net/tin-tuc/khoe-dep',
            'callback': function (error, result, $) {
                var li = $('#news_home').children();
                var data = [];
                var obj = {};
                for(var i=0;i<li.length;i++){
					var item = $(li).eq(i);
					obj = {};
					obj.title = item.find('h2.title_news a').text();
					obj.url = item.find('h2.title_news a').attr('href');
					obj.thumb_url = item.find('.thumb img').attr('src');
					obj.intro_text = item.find('.news_lead').text();
					data.push(obj);
                }
                console.log(data);
				InsertDB(data);
            }
        }]);
}catch(e)
{
	console.log(e);
}

function InsertDB(data)
{
	try{
		

		// Connection URL
		//var url = 'mongodb://52.11.98.62:27017/fan2clip';
		var url = 'mongodb://phuongnv:123456@localhost:27017/vandieuhay'
		console.log(url);
		// Use connect method to connect to the Server
		MongoClient.connect(url, function(err, db) {
			assert.equal(null, err);
			console.log("Connected correctly to server");
			insertArticleUrls(db, data, function() {
				db.close();
			});
		});
	}catch(e)
	{
		console.log(e);
	}
}

var insertArticleUrls = function(db, arrayData, callback) {
  // Get the documents collection
  var collection = db.collection('article_urls');
  // Insert some documents
  collection.insertMany(arrayData, function(err, result) {
    assert.equal(err, null);
    assert.equal(3, result.result.n);
    assert.equal(3, result.ops.length);
    console.log("Inserted 3 documents into the document collection");
	//console.log('result.ops.length:'+result.ops.length);
	//console.log('result.result.n:'+result.result.n);
    callback(result);
  });
}