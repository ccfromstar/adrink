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

exports.checkuserLogin = function(req, res, next) {
	if(!req.session.cuser) {
		res.locals.cuser = null;
	} else {
		res.locals.cuser = req.session.cuser;
	}
	next();
}

exports.getopenid = function(req, res) {
	
}

exports.news = function(req, res) {
	res.render('erp/news', {});
}

exports.newsdo = function(req, res) {
	res.setHeader("Access-Control-Allow-Origin", "*");
	var sql = req.params.sql;
	if(sql == "create") {
		var mode = req.param("mode");
		var title = req.param("title");
		var post = req.param("post");
		
		var editid = req.param("editid");
		/*对单引号进行转义*/
		title = title.replace(/'/g, "\\'");
		post = post.replace(/'/g, "\\'");
		/*编辑模式*/
		if(mode == "edit") {
			var sql = "update news set ";
			sql += " title = '" + title + "',";
			sql += " post = '" + post + "'";
			sql += " where id = " + editid;
			mysql.query(sql, function(err, result) {
				if(err) return console.error(err.stack);
				if(result.affectedRows == 1) {
					res.send("300");
				}
			});
		} else {
			var sql = "insert into news (title,post,publishAt) values ('" + title + "','" + post + "',now())";
			mysql.query(sql, function(err, result) {
				if(err) return console.error(err.stack);
				if(result.affectedRows == 1) {
					res.send("300");
				}
			});
		}
	} else if(sql == "get") {
		var page = parseInt(req.param("indexPage"));
		var LIMIT = 10;
		page = (page && page > 0) ? page : 1;
		var limit = (limit && limit > 0) ? limit : LIMIT;

		var change = "";

		var sql1 = "select * from news where 1=1 " + change + " order by publishAt desc limit " + (page - 1) * limit + "," + limit;
		var sql2 = "select count(*) as count from news where 1=1 " + change;
		debug(sql1);
		async.waterfall([function(callback) {
			mysql.query(sql1, function(err, result) {
				if(err) return console.error(err.stack);
				for(var i in result) {
					result[i].publishAt = (result[i].publishAt).Format("yyyy-MM-dd hh:mm:ss");
				}
				callback(null, result);
			});
		}, function(result, callback) {
			mysql.query(sql2, function(err, rows) {
				if(err) return console.error(err.stack);
				callback(err, rows, result);
			});
		}], function(err, rows, result) {
			if(err) {
				console.log(err);
			} else {

				var total = rows[0].count;
				var totalpage = Math.ceil(total / limit);
				var isFirstPage = page == 1;
				var isLastPage = ((page - 1) * limit + result.length) == total;

				var ret = {
					total: total,
					totalpage: totalpage,
					isFirstPage: isFirstPage,
					isLastPage: isLastPage,
					record: result
				};
				res.json(ret);
			}
		});
	} else if(sql == "del") {
		var id = req.param("id");
		var sql = "delete from news where id = " + id;
		console.log(sql);
		mysql.query(sql, function(err, result) {
			if(err) return console.error(err.stack);
			if(result.affectedRows == 1) {
				res.send("300");
			}
		});
	} else if(sql == "getById") {
		var id = req.param("id");
		var sql = "select * from news where id = " + id;
		mysql.query(sql, function(err, result) {
			if(err) return console.error(err.stack);
			res.json(result);
		});
	} else if(sql == "getTop") {
		var sql = "select * from news order by publishAt desc limit 6";
		mysql.query(sql, function(err, result) {
			if(err) return console.error(err.stack);
			for(var i in result){
				result[i].publishAt = (result[i].publishAt).Format("yyyy-MM-dd hh:mm:ss");
			}
			res.json(result);
		});
	} else if(sql == "getNews") {
		var sql = "select * from news order by publishAt desc";
		mysql.query(sql, function(err, result) {
			if(err) return console.error(err.stack);
			for(var i in result){
				result[i].publishAt = (result[i].publishAt).Format("yyyy-MM-dd hh:mm:ss");
			}
			res.json(result);
		});
	} else if(sql == "getByIdAndNext") {
		var id = req.param("id");
		var sql = "select * from news where id = " + id;
		mysql.query(sql, function(err, result) {
			if(err) return console.error(err.stack);
			var sql1 = "select * from news where id = (select max(id) from news where id < " + id + ")";
			mysql.query(sql1, function(err1, result1) {
				if(err1) return console.error(err1.stack);
				var sql2 = "select * from news where id = (select min(id) from news where id > " + id + ")";
				mysql.query(sql2, function(err2, result2) {
					if(err2) return console.error(err2.stack);
					result[0].front = result1;
					result[0].next = result2;
					res.json(result);
				});
			});
		});
	}
}


exports.index = function(req, res) {
	res.render('front/index', {});
};

exports.erp_home = function(req, res) {
	res.render('erp/home', {});
};

exports.erp_view_news = function(req, res) {
	res.render('erp/view_news', {});
};

exports.erp_role = function(req, res) {
	res.render('erp/role', {});
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
	} else if(_sql == "getRole") {
		var sql = "select * from c_role";
		mysql.query(sql, function(err, result) {
			if(err) return console.error(err.stack);
			res.send(result);
		});
	} else if(_sql == "insertRole") {
		var username = req.param("username");
		var password = req.param("password");
		var name = req.param("name");
		var role = req.param("role");
		var sql = "insert into c_role(username,password,name,role) values('"+username+"','"+password+"','"+name+"','"+role+"')";
		mysql.query(sql, function(err, result) {
			if(err) return console.error(err.stack);
			res.send("200");
		});
	} else if(_sql == "createUser") {
		var mobile = req.param("mobile");
		var pwd = req.param("pwd");
		var sql = "insert into user(mobile,pwd,createAt) values('"+mobile+"','"+pwd+"',now())";
		mysql.query(sql, function(err, result) {
			if(err) return console.error(err.stack);
			res.send("200");
		});
	} else if(_sql == "delRole") {
		var id = req.param("id");
		var sql = "delete from c_role where id = "+id;
		mysql.query(sql, function(err, result) {
			if(err) return console.error(err.stack);
			res.send("200");
		});
	} else if(_sql == "getRoleById") {
		var id = req.param("id");
		var sql = "select * from c_role where id = "+id;
		mysql.query(sql, function(err, result) {
			if(err) return console.error(err.stack);
			res.send(result);
		});
	} else if(_sql == "UptateRole") {
		var id = req.param("id");
		var username = req.param("username");
		var password = req.param("password");
		var name = req.param("name");
		var role = req.param("role");
		var sql1 = "update c_role set ";
				sql1 += " username = '" + username + "',";
				sql1 += " password = '" + password + "',";
				sql1 += " name = '" + name + "',";
				sql1 += " role = '" + role + "'";
				sql1 += " where id = " + id;
		mysql.query(sql1, function(err, result) {
			if(err) return console.error(err.stack);
			res.send("200");
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