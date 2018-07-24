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

function getUrl(req) {
	return req.url;
}

exports._upload = function(req, res) {
	res.render('_upload',{layout:false});
};

exports._uploadsuccess = function(req, res) {
	var p = req.query.p;
	res.render('_uploadsuccess', {
		layout:false,
		url: getUrl(req),
		p: p
	});
};

exports._uploaddo = function(req, res) {
	console.log(req.files);
	var img_url = req.files.img_url;
	var namelist = "";
	if(img_url.path){
		namelist = img_url.path.replace("public\\upload\\", "").replace("public/upload/", "");
	}else{
		for(var i in img_url){
			var x = img_url[i].path.replace("public\\upload\\", "").replace("public/upload/", "");
			namelist = (namelist == ""?(x):(namelist+";"+x));
		}
	}
	
	var bianhao = req.body.bianhao;
	var arr1 = namelist.split(";");

	for(var i=0;i<arr1.length;i++){
		var sql = "insert into input_files(name,bianhao) values('"+arr1[i]+"','"+bianhao+"')";
		console.log(sql);
		mysql.query(sql, function(err, result) {
			if(err) return console.error(err.stack);
		});
	}
	
	res.redirect("_uploadsuccess?p=" + namelist);
};

exports.news = function(req, res) {
	res.render('erp/news', {});
}

exports.product = function(req, res) {
	res.render('erp/product', {});
}

exports.booking = function(req, res) {
	res.render('erp/view_booking', {});
}

exports.view_user = function(req, res) {
	res.render('erp/view_user', {});
}

exports.view_tj = function(req, res) {
	res.render('erp/view_tj', {});
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

exports.bookingdo = function(req, res) {
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

exports.uploadImg = function(req, res) {
	var fname = req.files.imgFile.path.replace("public\\upload\\", "").replace("public/upload/", "");
	var info = {
		"error": 0,
		"url": "/upload/" + fname
	};
	res.send(info);
}

exports.productdo = function(req, res) {
	res.setHeader("Access-Control-Allow-Origin", "*");
	var sql = req.params.sql;
	if(sql == "create") {
		var mode = req.param("mode");

		var name = req.param("name");
		var pinpai = req.param("pinpai");
		var chandi = req.param("chandi");
		var shuliang = req.param("shuliang");
		var bianhao = req.param("bianhao");
		var baozhuang = req.param("baozhuang");
		var jihanliang = req.param("jihanliang");
		var baozhiqi = req.param("baozhiqi");
		var chicun = req.param("chicun");
		var cuchunfangshi = req.param("cuchunfangshi");
		var numStock = req.param("numStock");
		var numSales = req.param("numSales");
		var weight = req.param("weight");
		var price = req.param("price");
		var type = req.param("type");
		var feature = req.param("feature");

		var post = req.param("post");
		
		var editid = req.param("editid");
		/*对单引号进行转义*/
		//title = title.replace(/'/g, "\\'");
		post = post.replace(/'/g, "\\'");
		/*编辑模式*/
		if(mode == "edit") {
			var sql = "update product set ";
			sql += " name = '" + name + "',";
			sql += " pinpai = '" + pinpai + "',";
			sql += " chandi = '" + chandi + "',";
			sql += " shuliang = '" + shuliang + "',";
			sql += " bianhao = '" + bianhao + "',";
			sql += " baozhuang = '" + baozhuang + "',";
			sql += " jihanliang = '" + jihanliang + "',";
			sql += " baozhiqi = '" + baozhiqi + "',";
			sql += " chicun = '" + chicun + "',";
			sql += " cuchunfangshi = '" + cuchunfangshi + "',";
			sql += " numStock = '" + numStock + "',";
			sql += " numSales = '" + numSales + "',";
			sql += " weight = '" + weight + "',";
			sql += " price = '" + price + "',";
			sql += " type = '" + type + "',";
			sql += " feature = '" + feature + "',";
			sql += " updateAt = now(),";
			sql += " post = '" + post + "'";
			sql += " where id = " + editid;
			mysql.query(sql, function(err, result) {
				if(err) return console.error(err.stack);
				if(result.affectedRows == 1) {
					res.send("300");
				}
			});
		} else {
			var sql = "insert into product (name,pinpai,chandi,shuliang,bianhao,baozhuang,jihanliang,baozhiqi,chicun,cuchunfangshi,numStock,numSales,weight,price,type,post,updateAt,feature) ";
			sql += "values ('"+name+"','"+pinpai+"','"+chandi+"','"+shuliang+"','"+bianhao+"','"+baozhuang+"','"+jihanliang+"','"+baozhiqi+"','"+chicun+"','"+cuchunfangshi+"','"+numStock+"','"+numSales+"','"+weight+"','"+price+"','"+type+"','"+post+"',now(),'"+feature+"')";
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

		var sql1 = "select * from product where 1=1 " + change + " order by id desc limit " + (page - 1) * limit + "," + limit;
		var sql2 = "select count(*) as count from product where 1=1 " + change;
		debug(sql1);
		async.waterfall([function(callback) {
			mysql.query(sql1, function(err, result) {
				if(err) return console.error(err.stack);
				for(var i in result) {
					//result[i].publishAt = (result[i].publishAt).Format("yyyy-MM-dd hh:mm:ss");
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
		var sql = "delete from product where id = " + id;
		console.log(sql);
		mysql.query(sql, function(err, result) {
			if(err) return console.error(err.stack);
			if(result.affectedRows == 1) {
				res.send("300");
			}
		});
	} else if(sql == "getById") {
		var id = req.param("id");
		var sql = "select * from product where id = " + id;
		mysql.query(sql, function(err, result) {
			if(err) return console.error(err.stack);
			/*获取图片*/
			var sql1 = "select * from input_files where bianhao ='"+result[0].bianhao+"'";
			mysql.query(sql1, function(err, result1) {
				if(err) return console.error(err.stack);
				res.json({
					result:result,
					result1:result1
				});
			});
		});
	} else if(sql == "getById1") {
		var id = req.param("id");
		var sql = "select * from product where id = " + id;
		mysql.query(sql, function(err, result) {
			if(err) return console.error(err.stack);
			res.json(result);
		});
	} else if(sql == "getImgById") {
		var id = req.param("id");
		var sql = "select * from input_files where bianhao = '" + id +"'";
		mysql.query(sql, function(err, result) {
			if(err) return console.error(err.stack);
			res.json(result);
		});
	}else if(sql == "getTop") {
		var sql = "select * from v_product group by bianhao order by updateAt desc limit 6";
		mysql.query(sql, function(err, result) {
			if(err) return console.error(err.stack);
			for(var i in result){
				result[i].updateAt = (result[i].updateAt).Format("yyyy-MM-dd hh:mm:ss");
			}
			res.json(result);
		});
	} else if(sql == "getList") {
		var type = req.param("type");
		var o1 = req.param("o1");
		var o2 = req.param("o2");
		var sql = "select * from v_product where type like '%"+type+"%' group by bianhao order by "+o1+" "+o2;
		console.log(sql);
		mysql.query(sql, function(err, result) {
			if(err) return console.error(err.stack);
			for(var i in result){
				result[i].updateAt = (result[i].updateAt).Format("yyyy-MM-dd hh:mm:ss");
			}
			res.json(result);
		});
	} else if(sql == "getList1") {
		var pname = req.param("pname");
		var sql = "select * from v_product where name like '%"+pname+"%'  group by bianhao";
		console.log(sql);
		mysql.query(sql, function(err, result) {
			if(err) return console.error(err.stack);
			for(var i in result){
				result[i].updateAt = (result[i].updateAt).Format("yyyy-MM-dd hh:mm:ss");
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
	res.redirect("websit/page/index.html");
};

exports.erp_home = function(req, res) {
	res.render('erp/home', {});
};

exports.erp_view_news = function(req, res) {
	res.render('erp/view_news', {});
};

exports.erp_view_product = function(req, res) {
	res.render('erp/view_product', {});
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
	} else if(_sql == "createBooking") {
		var address = req.param("address");
		var remark = req.param("remark");
		var idlist = req.param("idlist");
		var sessionID = req.param("sessionID");
		var bookingno = new Date().getTime();

		var sql = "insert into booking(bookingno,date,state,address,remark,userid) values('"+bookingno+"',now(),'订单未支付','"+address+"','"+remark+"','"+sessionID+"');";
		mysql.query(sql, function(err, result) {
			if(err) return console.error(err.stack);
			var arr2 = idlist.split("@");
			console.log(idlist);
			for(var i=0;i<arr2.length;i++){
				var sql2 = "update cart set bookingno = '"+bookingno+"' where proID='"+arr2[i]+"'";
				mysql.query(sql2, function(err, result2) {
					if(err) return console.error(err.stack);
				});
			}
			res.send("200");
		});
	} else if(_sql == "checkUser") {
		var mobile = req.param("mobile");
		var pwd = req.param("pwd");
		var sql = "select * from user where mobile = '" + mobile + "'";
		console.log(sql);
		mysql.query(sql, function(err, result) {
			if(err) return console.error(err.stack);
			if(!result[0]) {
				res.send("400");
				return;
			}
			if(result[0].pwd == pwd) {
				res.send("200");
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
	} else if(_sql == "getBooking") {
		var sessionID = req.param("sessionID");
		var sql = "select * from v_booking where userid = '"+sessionID+"' group by bianhao";
		mysql.query(sql, function(err, result) {
			if(err) return console.error(err.stack);
			res.send(result);
		});
	} else if(_sql == "getCartNum") {
		var sessionID = req.param("sessionID");
		var sql = "select sum(num) as count from cart where userid = '"+sessionID+"' and bookingno =''";
		console.log(sql);
		mysql.query(sql, function(err, result) {
			if(err) return console.error(err.stack);
			console.log(result);
			res.send(result);
		});
	} else if(_sql == "getCart") {
		var sessionID = req.param("sessionID");
		var sql = "select * from v_cart where userid = '"+sessionID+"' and bookingno ='' group by bianhao";
		console.log(sql);
		mysql.query(sql, function(err, result) {
			if(err) return console.error(err.stack);
			console.log(result);
			res.send(result);
		});
	} else if(_sql == "addCart") {
		var num1 = req.param("num1");
		var proid = req.param("proid");
		var sessionID = req.param("sessionID");
		var sql = "insert into cart(userid,proID,num) values('"+sessionID+"','"+proid+"','"+num1+"')";
		mysql.query(sql, function(err, result) {
			if(err) return console.error(err.stack);
			res.send("200");
		});
	} else if(_sql == "setCart") {
		var id = req.param("id");
		var num = req.param("num");
		var sql = "update cart set num = '"+num+"' where id = "+id;
		mysql.query(sql, function(err, result) {
			if(err) return console.error(err.stack);
			res.send("200");
		});
	} else if(_sql == "setChecked") {
		var id = req.param("id");
		var sed = req.param("sed");
		var sql = "update cart set selected = '"+sed+"' where id = "+id;
		mysql.query(sql, function(err, result) {
			if(err) return console.error(err.stack);
			res.send("200");
		});
	}  else if(_sql == "delCart") {
		var id = req.param("id");
		var sql = "delete from cart where id = "+id;
		mysql.query(sql, function(err, result) {
			if(err) return console.error(err.stack);
			res.send("200");
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