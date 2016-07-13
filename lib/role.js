'use strict';

var mongo = require('mongodb');
var redis = require('redis');
var assert = require('assert');
var Validate = require('./validate.js');
var BASE = require('./const.js');

// 用户角色处理模块
module.exports = {
	/*
	 * 创建角色
	 * @param {object} 角色信息参数，至少包含id或用户名、角色名、职业
	 * @param {function} 回调函数，cb(err, info)
	 */
	createRole: function(options, cb){
		assert.equal('object', typeof options);
		assert.equal('function', typeof cb);
		
		// 创建角色基本参数必须包含：用户id或用户名，角色名，职业
		
		// 检测是否包含识别用户的信息，如id或用户名
		if(!options.id && !options.username){
			cb.call(null, new Error('Invalid user id or user name'));
			return;
		}
		
		// 检测是否包含角色名
		if('string' == typeof options.rolename){
			cb.call(null, new Error('Invalid role name'));
			return;
		}
		
		// 检测是否包含职业
		if('number' == typeof options.profession){
			cb.call(null, new Error('Invalid role profession'));
			return;
		}
		
		
	},
	
	
	createUser : function(options, cb){
		assert.equal('object', typeof options);
		assert.equal('function', typeof cb);
		
		if('string' == typeof options.username && 'string' == typeof options.password){
			// 验证用户名合法性
			if(!Validate.validateUsername(options.username)){
				cb.call(null, new Error('Invalid username'));
				return;
			}
			
			// 验证密码
			if(!Validate.validatePassword(options.password)){
				cb.call(null, new Error('Invalid password'));
				return;
			}
			
			// 连接数据库
			mongo.MongoClient.connect(BASE.MONGOURL, function(err, db){
				assert.equal(null, err);
				
				// 搜索条件
				var search;
				if(options.id){
					search = {id: options.id};
				}else{
					search = {username: options.username};
				}
				// 搜索用户，查看是否已注册
				db.collection('user').find(search)
			});
		}else{
			cb.call(null, new Error('Invalid username or password'));
			return;
		}
	}
};