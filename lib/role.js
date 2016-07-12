'use strict';

var mongo = require('mongodb');
var redis = require('redis');
var assert = require('assert');

// 用户角色处理模块
module.exports = {
	createRole: function(options, cb){
		assert.equal('object', typeof options);
		assert.equal('function', typeof cb);
		
		// 创建角色基本参数必须包含：用户id或用户名，角色名，职业
		
		if(!options.id && !options.username){
			cb.call(null, new Error('Invalid user id or user name'));
			return;
		}
		
		if('string' == typeof options.rolename){
			cb.call(null, new Error('Invalid role name'));
			return;
		}
	}
};