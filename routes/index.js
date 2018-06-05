var settings = require('../settings');
var mysql = require('../models/db');
var async = require('async');
var debug = require('debug')('myapp:index');
var ejsExcel = require("./ejsExcel");
var fs = require("fs");
var formidable = require('formidable');
var request = require("request");
var crypto = require("crypto");
var Iconv = require('iconv-lite');

exports.getopenid = function(req, res) {
	
}

exports.erp_home = function(req, res) {
	res.render('erp/home', {});
};

exports.servicedo = function(req, res) {
	res.setHeader("Access-Control-Allow-Origin", "*");
	var _sql = req.params.sql;
	if(_sql == "getTotal") {
		var sql = "select count(id) as count from user where id > 150";
		mysqlphp.query(sql, function(err, result) {
			if(err) return console.error(err.stack);
			console.log(result);
			res.json(result);

		});
	} else if(_sql == "checkLogin") {
		var uname = req.param("uname");
		var pwd = req.param("pwd");
		var sql = "select * from c_role where username = '" + uname + "'";
		console.log(sql);
		mysql.query(sql, function(err, result) {
			if(err) return console.error(err.stack);
			if(!result[0]) {
				res.send("400");
				return;
			}
			if(result[0].password == pwd) {
				res.json(result[0]);
			} else {
				res.send("400");
			}
		});
	}
}

Date.prototype.Format = function(fmt) {
	var d = this;
	var o = {
		"M+": d.getMonth() + 1, //月份
		"d+": d.getDate(), //日
		"h+": d.getHours(), //小时
		"m+": d.getMinutes(), //分
		"s+": d.getSeconds(), //秒
		"q+": Math.floor((d.getMonth() + 3) / 3), //季度
		"S": d.getMilliseconds() //毫秒
	};
	if (/(y+)/.test(fmt)) {
		fmt = fmt.replace(RegExp.$1, (d.getFullYear() + "").substr(4 - RegExp.$1.length));
	}
	for (var k in o) {
		if (new RegExp("(" + k + ")").test(fmt)) {
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
		}
	}
	return fmt;
}