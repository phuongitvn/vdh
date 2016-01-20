var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var config   = require('./config.js');
var ArticleUrls = {
	collection: 'article_urls',
	insert: function(arrayData) {
		try{
			//connect db
			var url = config.db_conn_string;
			MongoClient.connect(url, function(err, db) {
				assert.equal(null, err);
				console.log("Connected correctly to server");
				ArticleUrls.insertDocuments(db,arrayData, function(){
					db.close();
				});
		  	})
	  	}catch(e)
		{
			console.log(e);
		}
	},
	findAll: function(where, callback) {
		try{
			//connect db
			var url = config.db_conn_string;
			MongoClient.connect(url, function(err, db) {
				assert.equal(null, err);
				console.log("Connected correctly to server");
				var findRes = ArticleUrls.findDocuments(db,where,function(result){
					db.close();
					callback(result);
				});
				//console.log('findRes'+findRes);
		  	})
	  	}catch(e)
		{
			console.log(e);
		}
	},
	insertDocuments: function(db, arrayData, callback) {
	  	// Get the documents collection
	  	var collName = ArticleUrls.collection;
	  	var collection = db.collection(collName);
	  	// Insert some documents
	  	var where = {
            		slug: arrayData[0].slug
            	};
	  	var exitstSlug = ArticleUrls.findAll(where, function(res){
	  		if(res.length<=0){
		  		collection.insertMany(arrayData, function(err, result) {
			    	assert.equal(err, null);
			    	//assert.equal(3, result.result.n);
			    	//assert.equal(3, result.ops.length);
			    	console.log("Inserted "+result.ops.length+" documents into the document collection");
					console.log('result.ops.length:'+result.ops.length);
					console.log('result.result.n:'+result.result.n);
			    	callback(result);
				});
	  		}
	  	});
	  	
	},
	findDocuments: function(db, where, callback) {
  		// Get the documents collection
  		var collName = ArticleUrls.collection;
  		var collection = db.collection(collName);
  		// Find some documents
  		collection.find(where).toArray(function(err, docs) {
    		assert.equal(err, null);
    		//assert.equal(2, docs.length);
    		//console.log("Found the following records");
    		//console.dir(docs);
    		//console.log(docs.length);
    		callback(docs);
  		});
	}
}
module.exports = ArticleUrls;