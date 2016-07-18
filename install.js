'use strict';

var mongo = require('mongodb').MongoClient;
var assert = require('assert');
var fs = require('fs');
var EventEmitter = require('events');

// 数据库配置
var config = {
	mongodb: "mongodb://www:123@127.0.0.1:27017/WRGgame"
};

// 加载游戏基本信息
var loadGameBaseinfo = function(collection, cb){
	fs.readFile('./config/game.json', function(err, buf){
		assert.equal(null, err);
		
		// 要插入的数据
		var data = JSON.parse(buf.toString());
		
		// 数据总数
		var count = 0;
		
		// 已完成插入的数据
		var finish = 0;
		
		for(var i in data){
			count++;
			collection.insert({
				"name": i,
				"value": data[i]
			}, function(err, result){
				assert.equal(null, err);
				
				finish++;
				if(result.insertedCount != 1){
					console.log('一条数据插入失败');
				}
				
				if(finish == count){
					// 插入完成
					if('function' == typeof cb) cb.call(null);
				}
			});
		}
	});
}

// 安装程序
var install = function(){
	// 连接数据库
	mongo.connect(config.mongodb, function(err, db){
		assert.equal(null, err);
		
		var baseinfo = db.collection('baseinfo');
		var user = db.collection('uesr');
		
		// 清空数据库
		db.dropDatabase(function(err){
			assert.equal(null, err);
			
			loadGameBaseinfo();
		});
	});
}