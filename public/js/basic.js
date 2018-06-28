var height = $(window).height();
var width = $(window).width();

_checkIE();

function _checkIE() {
	var browser = navigator.appName;
	var b_version = navigator.appVersion;
	if (b_version.indexOf(';') == -1) {
		return false;
	}
	var version = b_version.split(";");
	var trim_Version = version[1].replace(/[ ]/g, "");
	if (browser == "Microsoft Internet Explorer" && trim_Version == "MSIE6.0") {
		//alert("IE 6.0"); 
		_showNotAllow();
	} else if (browser == "Microsoft Internet Explorer" && trim_Version == "MSIE7.0") {
		//alert("IE 7.0"); window.location.href="http://xxxx.com";
		_showNotAllow();
	} else if (browser == "Microsoft Internet Explorer" && trim_Version == "MSIE8.0") {
		//alert("IE 8.0"); 
		_showNotAllow();
	} else if (browser == "Microsoft Internet Explorer" && trim_Version == "MSIE9.0") {
		//alert("IE 9.0"); 
		_showNotAllow();
	} else {
		//your code goes here
	}
}

function _showNotAllow() {
	alert("对不起，您的浏览器版本过低，请升级IE或改用其他浏览器访问！");
	window.location = "/page/ieupdate.html";
}

function toLocation(page) {
	window.location = page;
}

var url = window.location.href;

$(function() {
	/*
	$('nav ul li:eq(4),nav ul li:eq(5)').bind('click', function() {
		if ($(this).find('dl').css('display') == 'none') {
			$(this).find('dl').show();
		} else {
			$(this).find('dl').hide();
		}
	});
	*/
	computerByRatio();
	$('.select').select2();
});

window.onresize = function () {
	width = $(window).width();
	height = $(window).height();
	computerByRatio();
}

function computerByRatio(){
	$('.table').css('width',width - 190 - 50);
	$('.div_auto').css('width',width - 190 - 40).css('height',height - 55 - 60);
	$('.div_auto_short').css('width',width - 190 - 40).css('height',height - 55 - 260);
}

function newFrom(page) {
		window.sessionStorage.setItem("mode", "new");
		window.sessionStorage.removeItem("editid");
		window.location = '/' + page;
}

function showDelCofirm(id) {
	window.sessionStorage.setItem("delid", id);
	$("#del-confirm").modal();
}

function delDoc(i) {
	if (i == 0) {
		//新闻
		$.ajax({
			type: "post",
			url: "/news/del",
			data: {
				id: window.sessionStorage.getItem("delid")
			},
			success: function(data) {
				if (data == "300") {
					toPage(0,window.sessionStorage.getItem("indexPage"));
					$('.successinfo').html('<p>删除成功</p>').removeClass("none");
					setTimeout(function() {
						$('.successinfo').addClass("none");
					}, 2000);
				}
			}
		});
	}else if (i == 1) {
		//公告
		$.ajax({
			type: "post",
			url: "notice/del",
			data: {
				id: window.sessionStorage.getItem("delid")
			},
			success: function(data) {
				if (data == "300") {
					toPage(1,window.sessionStorage.getItem("indexPage"));
					$('.successinfo').html('<p>删除成功</p>').removeClass("none");
					setTimeout(function() {
						$('.successinfo').addClass("none");
					}, 2000);
				}
			}
		});
	}else if (i == 2) {
		//游记
		$.ajax({
			type: "post",
			url: "travel/del",
			data: {
				id: window.sessionStorage.getItem("delid")
			},
			success: function(data) {
				if (data == "300") {
					toPage(2,window.sessionStorage.getItem("indexPage"));
					$('.successinfo').html('<p>删除成功</p>').removeClass("none");
					setTimeout(function() {
						$('.successinfo').addClass("none");
					}, 2000);
				}
			}
		});
	}else if (i == 3) {
		//游记
		$.ajax({
			type: "post",
			url: "static/del",
			data: {
				id: window.sessionStorage.getItem("delid")
			},
			success: function(data) {
				if (data == "300") {
					toPage(2,window.sessionStorage.getItem("indexPage"));
					$('.successinfo').html('<p>删除成功</p>').removeClass("none");
					setTimeout(function() {
						$('.successinfo').addClass("none");
					}, 2000);
				}
			}
		});
	}else if (i == 4) {
		//常见问题
		$.ajax({
			type: "post",
			url: "faq/del",
			data: {
				id: window.sessionStorage.getItem("delid")
			},
			success: function(data) {
				if (data == "300") {
					toPage(4,window.sessionStorage.getItem("indexPage"));
					$('.successinfo').html('<p>删除成功</p>').removeClass("none");
					setTimeout(function() {
						$('.successinfo').addClass("none");
					}, 2000);
				}
			}
		});
	}else if (i == 5) {
		//
		$.ajax({
			type: "post",
			url: "note/del",
			data: {
				id: window.sessionStorage.getItem("delid")
			},
			success: function(data) {
				if (data == "300") {
					toPage(5,window.sessionStorage.getItem("indexPage"));
					$('.successinfo').html('<p>删除成功</p>').removeClass("none");
					setTimeout(function() {
						$('.successinfo').addClass("none");
					}, 2000);
				}
			}
		});
	}else if (i == 7) {
		//
		$.ajax({
			type: "post",
			url: "leader/del",
			data: {
				id: window.sessionStorage.getItem("delid")
			},
			success: function(data) {
				if (data == "300") {
					toPage(7,window.sessionStorage.getItem("indexPage"));
					$('.successinfo').html('<p>删除成功</p>').removeClass("none");
					setTimeout(function() {
						$('.successinfo').addClass("none");
					}, 2000);
				}
			}
		});
	}
}

function editDoc(i, id) {
	if (i == 0) {
		//新闻
		window.sessionStorage.setItem("editid", id);
		window.sessionStorage.setItem("mode", "edit");
		window.location = '/news';
	}else if (i == 1) {
		//公告
		window.sessionStorage.setItem("editid", id);
		window.sessionStorage.setItem("mode", "edit");
		window.location = '/notice';
	}else if (i == 2) {
		//游记
		window.location = "/travel?id="+id;
	}else if (i == 3) {
		//静态内容
		window.sessionStorage.setItem("editid", id);
		window.sessionStorage.setItem("mode", "edit");
		window.location = '/static';
	}else if (i == 4) {
		//常见问题
		window.sessionStorage.setItem("editid", id);
		window.sessionStorage.setItem("mode", "edit");
		window.location = '/faq';
	}else if (i == 5) {
		//静态内容
		window.sessionStorage.setItem("editid", id);
		window.sessionStorage.setItem("mode", "edit");
		window.location = '/note';
	}else if (i == 7) {
		//静态内容
		window.sessionStorage.setItem("editid", id);
		window.sessionStorage.setItem("mode", "edit");
		window.location = '/leader1';
	}
}

function toPage(i, page) {
	var $modal = $('#my-modal-loading');
	$modal.modal();

	window.sessionStorage.setItem("indexPage", page);
	var indexPage = window.sessionStorage.getItem("indexPage");
	indexPage = indexPage ? indexPage : 1;

	if (i == 0) {
		$.ajax({
			type: "post",
			url: "/news/get",
			data: {
				indexPage: indexPage
			},
			success: function(data) {
				console.log(data);
				var html = "";
				var record = data.record;
				for (var i in record) {
					html += "<tr>";
					html += "<td>" + record[i].title + "</td>";
					html += "<td>" + record[i].publishAt + "</td>";
					//html += "<td>" + record[i].summary + "</td>";
					html += "<td><button type='button' onclick='editDoc(0," + record[i].id + ")' class='am-btn am-btn-default am-btn-xs am-text-secondary'><span class='am-icon-pencil-square-o'></span> 编辑</button>";
					html += "<button type='button' onclick='showDelCofirm(" + record[i].id + ")' class='am-btn am-btn-default am-btn-xs am-text-danger'><span class='am-icon-trash-o'></span> 删除</button></td>";
					html += "</tr>";
				}
				var isFirstPage = data.isFirstPage ? "am-disabled" : "";
				var isLastPage = data.isLastPage ? "am-disabled" : "";
				var pager = "";
				var iPa = Number(window.sessionStorage.getItem("indexPage"));
				iPa = iPa ? iPa : 1;
				for (var i = 1; i < data.totalpage + 1; i++) {
					var hasClass = "";
					if (i == iPa) {
						hasClass = "am-active";
					}

					pager += '<li class="' + hasClass + '"><a href="#" onclick="toPage(0,' + i + ')">' + i + '</a></li>';

				}
				var pagination = "<li class='" + isFirstPage + "'><a href='#' onClick='toPage(0," + (Number(window.sessionStorage.getItem("indexPage")) - 1) + ")'>«</a></li>";
				pagination += pager;
				pagination += "<li class='" + isLastPage + "'><a href='#' onClick='toPage(0," + (Number(window.sessionStorage.getItem("indexPage")) + 1) + ")'}>»</a></li>";
				$("#json_tbody").html(html);
				$("#total").html(data.total);
				$('#pagination').html(pagination);
				$modal.modal('close');
			}
		});
	} else if (i == 1) {
		$.ajax({
			type: "post",
			url: "/notice/get",
			data: {
				indexPage: indexPage
			},
			success: function(data) {
				console.log(data);
				var html = "";
				var record = data.record;
				for (var i in record) {
					html += "<tr>";
					html += "<td>" + record[i].title + "</td>";
					html += "<td>" + record[i].publishAt + "</td>";
					html += "<td><button type='button' onclick='editDoc(1," + record[i].id + ")' class='am-btn am-btn-default am-btn-xs am-text-secondary'><span class='am-icon-pencil-square-o'></span> 编辑</button>";
					html += "<button type='button' onclick='showDelCofirm(" + record[i].id + ")' class='am-btn am-btn-default am-btn-xs am-text-danger'><span class='am-icon-trash-o'></span> 删除</button></td>";
					html += "</tr>";
				}
				var isFirstPage = data.isFirstPage ? "am-disabled" : "";
				var isLastPage = data.isLastPage ? "am-disabled" : "";
				var pager = "";
				var iPa = Number(window.sessionStorage.getItem("indexPage"));
				iPa = iPa ? iPa : 1;
				for (var i = 1; i < data.totalpage + 1; i++) {
					var hasClass = "";
					if (i == iPa) {
						hasClass = "am-active";
					}

					pager += '<li class="' + hasClass + '"><a href="#" onclick="toPage(1,' + i + ')">' + i + '</a></li>';

				}
				var pagination = "<li class='" + isFirstPage + "'><a href='#' onClick='toPage(1," + (Number(window.sessionStorage.getItem("indexPage")) - 1) + ")'>«</a></li>";
				pagination += pager;
				pagination += "<li class='" + isLastPage + "'><a href='#' onClick='toPage(1," + (Number(window.sessionStorage.getItem("indexPage")) + 1) + ")'}>»</a></li>";
				$("#json_tbody").html(html);
				$("#total").html(data.total);
				$('#pagination').html(pagination);
				$modal.modal('close');
			}
		});
	}else if (i == 2) {
		$.ajax({
			type: "post",
			url: "/travel/get",
			data: {
				indexPage: indexPage
			},
			success: function(data) {
				console.log(data);
				var html = "";
				var record = data.record;
				for (var i in record) {
					html += "<tr>";
					html += "<td>" + record[i].txtTitle + "</td>";
					html += "<td>" + record[i].txtCategory1 + "</td>";
					html += "<td><button type='button' onclick='editDoc(2," + record[i].id + ")' class='am-btn am-btn-default am-btn-xs am-text-secondary'><span class='am-icon-pencil-square-o'></span> 编辑</button>";
					html += "<button type='button' onclick='showDelCofirm(" + record[i].id + ")' class='am-btn am-btn-default am-btn-xs am-text-danger'><span class='am-icon-trash-o'></span> 删除</button></td>";
					html += "</tr>";
				}
				var isFirstPage = data.isFirstPage ? "am-disabled" : "";
				var isLastPage = data.isLastPage ? "am-disabled" : "";
				var pager = "";
				var iPa = Number(window.sessionStorage.getItem("indexPage"));
				iPa = iPa ? iPa : 1;
				for (var i = 1; i < data.totalpage + 1; i++) {
					var hasClass = "";
					if (i == iPa) {
						hasClass = "am-active";
					}

					pager += '<li class="' + hasClass + '"><a href="#" onclick="toPage(2,' + i + ')">' + i + '</a></li>';

				}
				var pagination = "<li class='" + isFirstPage + "'><a href='#' onClick='toPage(2," + (Number(window.sessionStorage.getItem("indexPage")) - 1) + ")'>«</a></li>";
				pagination += pager;
				pagination += "<li class='" + isLastPage + "'><a href='#' onClick='toPage(2," + (Number(window.sessionStorage.getItem("indexPage")) + 1) + ")'}>»</a></li>";
				$("#json_tbody").html(html);
				$("#total").html(data.total);
				$('#pagination').html(pagination);
				$modal.modal('close');
			}
		});
	}else if (i == 3) {
		$.ajax({
			type: "post",
			url: "/static/get",
			data: {
				indexPage: indexPage
			},
			success: function(data) {
				console.log(data);
				var html = "";
				var record = data.record;
				for (var i in record) {
					html += "<tr>";
					html += "<td>" + record[i].name + "</td>";
					html += "<td><button type='button' onclick='editDoc(3," + record[i].id + ")' class='am-btn am-btn-default am-btn-xs am-text-secondary'><span class='am-icon-pencil-square-o'></span> 编辑</button>";
					html += "</tr>";
				}
				var isFirstPage = data.isFirstPage ? "am-disabled" : "";
				var isLastPage = data.isLastPage ? "am-disabled" : "";
				var pager = "";
				var iPa = Number(window.sessionStorage.getItem("indexPage"));
				iPa = iPa ? iPa : 1;
				for (var i = 1; i < data.totalpage + 1; i++) {
					var hasClass = "";
					if (i == iPa) {
						hasClass = "am-active";
					}

					pager += '<li class="' + hasClass + '"><a href="#" onclick="toPage(3,' + i + ')">' + i + '</a></li>';

				}
				var pagination = "<li class='" + isFirstPage + "'><a href='#' onClick='toPage(3," + (Number(window.sessionStorage.getItem("indexPage")) - 1) + ")'>«</a></li>";
				pagination += pager;
				pagination += "<li class='" + isLastPage + "'><a href='#' onClick='toPage(3," + (Number(window.sessionStorage.getItem("indexPage")) + 1) + ")'}>»</a></li>";
				$("#json_tbody").html(html);
				$("#total").html(data.total);
				$('#pagination').html(pagination);
				$modal.modal('close');
			}
		});
	}else if (i == 4) {
		$.ajax({
			type: "post",
			url: "/faq/get",
			data: {
				indexPage: indexPage
			},
			success: function(data) {
				console.log(data);
				var html = "";
				var record = data.record;
				for (var i in record) {
					html += "<tr>";
					html += "<td>" + record[i].title + "</td>";
					html += "<td><button type='button' onclick='editDoc(4," + record[i].id + ")' class='am-btn am-btn-default am-btn-xs am-text-secondary'><span class='am-icon-pencil-square-o'></span> 编辑</button>";
					html += "<button type='button' onclick='showDelCofirm(" + record[i].id + ")' class='am-btn am-btn-default am-btn-xs am-text-danger'><span class='am-icon-trash-o'></span> 删除</button></td>";
					html += "</tr>";
				}
				var isFirstPage = data.isFirstPage ? "am-disabled" : "";
				var isLastPage = data.isLastPage ? "am-disabled" : "";
				var pager = "";
				var iPa = Number(window.sessionStorage.getItem("indexPage"));
				iPa = iPa ? iPa : 1;
				for (var i = 1; i < data.totalpage + 1; i++) {
					var hasClass = "";
					if (i == iPa) {
						hasClass = "am-active";
					}

					pager += '<li class="' + hasClass + '"><a href="#" onclick="toPage(4,' + i + ')">' + i + '</a></li>';

				}
				var pagination = "<li class='" + isFirstPage + "'><a href='#' onClick='toPage(4," + (Number(window.sessionStorage.getItem("indexPage")) - 1) + ")'>«</a></li>";
				pagination += pager;
				pagination += "<li class='" + isLastPage + "'><a href='#' onClick='toPage(4," + (Number(window.sessionStorage.getItem("indexPage")) + 1) + ")'}>»</a></li>";
				$("#json_tbody").html(html);
				$("#total").html(data.total);
				$('#pagination').html(pagination);
				$modal.modal('close');
			}
		});
	}else if (i == 5) {
		$.ajax({
			type: "post",
			url: "/note/get",
			data: {
				indexPage: indexPage
			},
			success: function(data) {
				console.log(data);
				var html = "";
				var record = data.record;
				for (var i in record) {
					html += "<tr>";
					html += "<td>" + record[i].name + "</td>";
					html += "<td><button type='button' onclick='editDoc(5," + record[i].id + ")' class='am-btn am-btn-default am-btn-xs am-text-secondary'><span class='am-icon-pencil-square-o'></span> 编辑</button>";
					html += "<button type='button' onclick='showDelCofirm(" + record[i].id + ")' class='am-btn am-btn-default am-btn-xs am-text-danger'><span class='am-icon-trash-o'></span> 删除</button></td>";
					html += "</tr>";
				}
				var isFirstPage = data.isFirstPage ? "am-disabled" : "";
				var isLastPage = data.isLastPage ? "am-disabled" : "";
				var pager = "";
				var iPa = Number(window.sessionStorage.getItem("indexPage"));
				iPa = iPa ? iPa : 1;
				for (var i = 1; i < data.totalpage + 1; i++) {
					var hasClass = "";
					if (i == iPa) {
						hasClass = "am-active";
					}

					pager += '<li class="' + hasClass + '"><a href="#" onclick="toPage(5,' + i + ')">' + i + '</a></li>';

				}
				var pagination = "<li class='" + isFirstPage + "'><a href='#' onClick='toPage(5," + (Number(window.sessionStorage.getItem("indexPage")) - 1) + ")'>«</a></li>";
				pagination += pager;
				pagination += "<li class='" + isLastPage + "'><a href='#' onClick='toPage(5," + (Number(window.sessionStorage.getItem("indexPage")) + 1) + ")'}>»</a></li>";
				$("#json_tbody").html(html);
				$("#total").html(data.total);
				$('#pagination').html(pagination);
				$modal.modal('close');
			}
		});
	}else if (i == 6) {
		$.ajax({
			type: "post",
			url: "/tt/get",
			data: {
				indexPage: indexPage
			},
			success: function(data) {
				console.log(data);
				var html = "";
				var record = data.record;
				for (var i in record) {
					var remark = record[i].remark;
					if(!remark){
						remark = "";
					}else if(remark == "领队预订"){
						remark = "领队自乘";
					}
					html += "<tr>";
					html += "<td>" + record[i].name + "</td>";
					html += "<td>" + record[i].mobile + "</td>";
					html += "<td>" + record[i].num + "</td>";
					html += "<td>" + record[i].line + "</td>";
					html += "<td>" + record[i].product + "</td>";
					html += "<td>" + record[i].price + "</td>";
					html += "<td>" + record[i].createAt + "</td>";
					html += "<td>" + record[i].date1 + "</td>";
					html += "<td>" + record[i].date2 + "</td>";
					html += "<td>" + remark + "</td>";
					html += "</tr>";
				}
				var isFirstPage = data.isFirstPage ? "am-disabled" : "";
				var isLastPage = data.isLastPage ? "am-disabled" : "";
				var pager = "";
				var iPa = Number(window.sessionStorage.getItem("indexPage"));
				iPa = iPa ? iPa : 1;
				for (var i = 1; i < data.totalpage + 1; i++) {
					var hasClass = "";
					if (i == iPa) {
						hasClass = "am-active";
					}

					pager += '<li class="' + hasClass + '"><a href="#" onclick="toPage(6,' + i + ')">' + i + '</a></li>';

				}
				var pagination = "<li class='" + isFirstPage + "'><a href='#' onClick='toPage(6," + (Number(window.sessionStorage.getItem("indexPage")) - 1) + ")'>«</a></li>";
				pagination += pager;
				pagination += "<li class='" + isLastPage + "'><a href='#' onClick='toPage(6," + (Number(window.sessionStorage.getItem("indexPage")) + 1) + ")'}>»</a></li>";
				$("#json_tbody").html(html);
				$("#total").html(data.total);
				$('#pagination').html(pagination);
				$modal.modal('close');
			}
		});
	}else if (i == 7) {
		$.ajax({
			type: "post",
			url: "/leader/get",
			data: {
				indexPage: indexPage
			},
			success: function(data) {
				console.log(data);
				var html = "";
				var record = data.record;
				var img = '',weixin = '';
				for (var i in record) {
					html += "<tr>";
					html += "<td>" + record[i].name + "</td>";
					html += "<td>" + record[i].no + "</td>";
					html += "<td>" + record[i].tel + "</td>";
					img = record[i].img?record[i].img:"";
					weixin = record[i].weixin?record[i].weixin:"";
					html += "<td>" + img + "</td>";
					html += "<td>" + weixin + "</td>";
					html += "<td><button type='button' onclick='editDoc(7," + record[i].id + ")' class='am-btn am-btn-default am-btn-xs am-text-secondary'><span class='am-icon-pencil-square-o'></span> 编辑</button>";
					html += "<button type='button' onclick='showDelCofirm(" + record[i].id + ")' class='am-btn am-btn-default am-btn-xs am-text-danger'><span class='am-icon-trash-o'></span> 删除</button></td>";
					html += "</tr>";
				}
				var isFirstPage = data.isFirstPage ? "am-disabled" : "";
				var isLastPage = data.isLastPage ? "am-disabled" : "";
				var pager = "";
				var iPa = Number(window.sessionStorage.getItem("indexPage"));
				iPa = iPa ? iPa : 1;
				for (var i = 1; i < data.totalpage + 1; i++) {
					var hasClass = "";
					if (i == iPa) {
						hasClass = "am-active";
					}

					pager += '<li class="' + hasClass + '"><a href="#" onclick="toPage(7,' + i + ')">' + i + '</a></li>';

				}
				var pagination = "<li class='" + isFirstPage + "'><a href='#' onClick='toPage(7," + (Number(window.sessionStorage.getItem("indexPage")) - 1) + ")'>«</a></li>";
				pagination += pager;
				pagination += "<li class='" + isLastPage + "'><a href='#' onClick='toPage(7," + (Number(window.sessionStorage.getItem("indexPage")) + 1) + ")'}>»</a></li>";
				$("#json_tbody").html(html);
				$("#total").html(data.total);
				$('#pagination').html(pagination);
				$modal.modal('close');
			}
		});
	}else if (i == 8) {
		$.ajax({
			type: "post",
			url: "/tt/getHH",
			data: {
				indexPage: indexPage
			},
			success: function(data) {
				console.log(data);
				var html = "";
				var record = data.record;
				for (var i in record) {
					var remark = record[i].remark;
					if(!remark){
						remark = "";
					}else if(remark == "领队预订"){
						remark = "领队自乘";
					}
					html += "<tr>";
					html += "<td>" + record[i].name + "</td>";
					html += "<td style='width:10%'>" + record[i].mobile + "</td>";
					html += "<td>" + record[i].num + "</td>";
					html += "<td>" + record[i].line + "</td>";
					html += "<td>" + record[i].product + "</td>";
					html += "<td>" + record[i].createAt + "</td>";
					html += "<td>" + record[i].date1 + "</td>";
					html += "<td>" + remark + "</td>";
					html += "</tr>";
				}
				var isFirstPage = data.isFirstPage ? "am-disabled" : "";
				var isLastPage = data.isLastPage ? "am-disabled" : "";
				var pager = "";
				var iPa = Number(window.sessionStorage.getItem("indexPage"));
				iPa = iPa ? iPa : 1;
				for (var i = 1; i < data.totalpage + 1; i++) {
					var hasClass = "";
					if (i == iPa) {
						hasClass = "am-active";
					}

					pager += '<li class="' + hasClass + '"><a href="#" onclick="toPage(6,' + i + ')">' + i + '</a></li>';

				}
				var pagination = "<li class='" + isFirstPage + "'><a href='#' onClick='toPage(6," + (Number(window.sessionStorage.getItem("indexPage")) - 1) + ")'>«</a></li>";
				pagination += pager;
				pagination += "<li class='" + isLastPage + "'><a href='#' onClick='toPage(6," + (Number(window.sessionStorage.getItem("indexPage")) + 1) + ")'}>»</a></li>";
				$("#json_tbody").html(html);
				$("#total").html(data.total);
				$('#pagination').html(pagination);
				$modal.modal('close');
			}
		});
	}
}

function loadNews() {
	toPage(0, 1);
}

function saveForm(table) {
	var mode = window.sessionStorage.getItem('mode');
	if (table == 'news') {
		var title = $('#title').val();

		html = editor.html();
		editor.sync();

		var post = $('#post').val();
		//var summary = $('#summary').val();

		if (!title) {
			alert("新闻标题不能为空");
			return false;
		}

		

		$.ajax({
			type: "post",
			url: "/news/create",
			data: {
				mode: mode,
				title: title,
				post: post,
				editid: window.sessionStorage.getItem("editid")
			},
			success: function(data) {
				if (data == "300") {
					alert("保存成功！");
					window.location = 'erp/view_news';
				}
			}
		});
	} else if (table == 'notice') {
		var title = $('#title').val();

		//html = editor.html();
		//editor.sync();

		var post = $('#post').val();
		
		if (!title) {
			showErr("公告标题不能为空");
			return false;
		}

		$.ajax({
			type: "post",
			url: "/notice/create",
			data: {
				mode: mode,
				title: title,
				post: post,
				editid: window.sessionStorage.getItem("editid")
			},
			success: function(data) {
				if (data == "300") {
					$('.successinfo').html('<p>保存成功</p>').removeClass("none");
					setTimeout(function() {
						window.location = 'view_notice';
					}, 1000);
				}
			}
		});
	}else if (table == 'static') {
		var name = $('#name').val();

		html = editor.html();
		editor.sync();

		var post = $('#post').val();

		if (!name) {
			showErr("标题不能为空");
			return false;
		}
		
		$.ajax({
			type: "post",
			url: "/static/create",
			data: {
				mode: mode,
				name: name,
				post: post,
				editid: window.sessionStorage.getItem("editid")
			},
			success: function(data) {
				if (data == "300") {
					$('.successinfo').html('<p>保存成功</p>').removeClass("none");
					setTimeout(function() {
						window.location = 'view_static';
					}, 1000);
				}
			}
		});
	} else if (table == 'faq') {
		var title = $('#title').val();

		//html = editor.html();
		//editor.sync();

		var post = $('#post').val();
		
		if (!title) {
			showErr("问题不能为空");
			return false;
		}

		$.ajax({
			type: "post",
			url: "/faq/create",
			data: {
				mode: mode,
				title: title,
				post: post,
				editid: window.sessionStorage.getItem("editid")
			},
			success: function(data) {
				if (data == "300") {
					$('.successinfo').html('<p>保存成功</p>').removeClass("none");
					setTimeout(function() {
						window.location = 'view_faq';
					}, 1000);
				}
			}
		});
	}else if (table == 'note') {
		var name = $('#name').val();

		html = editor.html();
		editor.sync();

		var post = $('#post').val();

		if (!name) {
			showErr("标题不能为空");
			return false;
		}
		
		$.ajax({
			type: "post",
			url: "/note/create",
			data: {
				mode: mode,
				name: name,
				post: post,
				editid: window.sessionStorage.getItem("editid")
			},
			success: function(data) {
				if (data == "300") {
					$('.successinfo').html('<p>保存成功</p>').removeClass("none");
					setTimeout(function() {
						window.location = 'view_note';
					}, 1000);
				}
			}
		});
	} else if (table == 'leader') {
		var name = $('#name').val();
		var no = $('#no').val();
		var tel = $('#tel').val();
		var img = $('#img').val();
		var weixin = $('#weixin').val();

		//html = editor.html();
		//editor.sync();

		//var post = $('#post').val();
		
		$.ajax({
			type: "post",
			url: "/leader/create",
			data: {
				mode: mode,
				name: name,
				no: no,
				tel: tel,
				img: img,
				weixin: weixin,
				editid: window.sessionStorage.getItem("editid")
			},
			success: function(data) {
				if (data == "300") {
					$('.successinfo').html('<p>保存成功</p>').removeClass("none");
					setTimeout(function() {
						window.location = 'view_leader';
					}, 1000);
				}
			}
		});
	} 
}