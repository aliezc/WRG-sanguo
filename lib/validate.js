'use strict';

var assert = require('assert');

// 简单密码样本
var smpPwd = [
	/^123456$/,
	/^123123$/,
	/^111111$/,
	/^666666$/,
	/^888888$/,
	/^112233$/,
	/^000000$/
];

/*
 * 格式合法性检测模块
 */

module.exports = {
	/*
	 * 检测用户名
	 * @param {string} 用户名，长度为4～20位，第一位不能是数字，其余只能是字母、数字和下划线
	 */
	validateUsername : function(s){
		assert.equal('string', typeof s);
		return /^[\D][a-z0-9_]{3,19}$/i.test(s);
	},
	
	/*
	 * 检测密码
	 * @param {string} 密码，长度6~20位，合法返回1，非法返回0，过于简单返回2
	 */
	validatePassword : function(s){
		assert.equal('string', typeof s);
		if(/^.{6,20}$/.test(s)){
			for(var i = 0; i < smpPwd.length; i++){
				if(smpPwd[i].test(s)){
					return 2;
				}
			}
			return 1;
		}else{
			return 0;
		}
	},
	
	/*
	 * 检测角色名
	 * @param {string} 角色名，长度2～8位，不能包含特殊符号
	 */
	validateRolename : function(s){
		assert.equal('string', typeof s);
		return /^[^\`\~\!\@\#\$\%\^\&\*\'\"\:\?\/\\\|]{2,8}$/.test(s);
	},
	
	/*
	 * 检测职业
	 * @param {string} 职业，数字1～3
	 */
	validateProfession : function(s){
		assert.equal('number', typeof s);
		s = Math.floor(s);
		return s > 0 ? (s < 4 ? true : false) : false;
	}
};