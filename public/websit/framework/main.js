$(function(){
	var sessionID = window.sessionStorage.sessionID;
	var txtHeader = '';
	txtHeader += '<div class="w960" style="text-align:right">';
	if(sessionID){
		txtHeader += '欢迎您，'+sessionID+' <span style="margin-left:10px;cursor:pointer;" onclick="gotologout()">登出</span> <img src="../framework/order.png" onclick="gotomy()"  style="height:20px;margin-left:10px;margin-top:-5px;cursor:pointer;" /> <span onclick="gotomy()" style="cursor:pointer;">我的订单</span> ';
	txtHeader += '<div class="cw-icon"><i class="ci-count" id="shopping-amount">-</i><img onclick="referToCart()" style="height:25px;margin-left:10px;margin-top:-5px;cursor:pointer;" src="../framework/cart.png" /></div>';
	
	}else{
		txtHeader += '<span style="margin-left:20px;display:inline-block;cursor:pointer;margin-top:3px" onclick="gotologin()">登录</span> | <span style="cursor:pointer;" onclick="gotoreg()">注册</span> ';
	
	}
	txtHeader += '</div>';
	$("#header").html(txtHeader);

	var txtMenu = '';
	txtMenu += '<div class="w960">';
	txtMenu += '<div style="float:left"><img src="../framework/logo1.png" style="height:80px;margin-top:10px" /></div>';
	txtMenu += '<div style="float:left;margin-top:60px;margin-left:20px">';
	txtMenu += '<span class="menu_span" id="m1" style="cursor:pointer;" onclick="referTo(0)">首页</span> | <span class="menu_span" id="m2" style="cursor:pointer;" onclick="referTo(1)">关于我们</span> | <span class="menu_span" id="m3" style="cursor:pointer;" onclick="referTo(2)">主营业务</span> | <span class="menu_span" id="m4" style="cursor:pointer;" onclick="referTo(3)">在线商城</span>';
	txtMenu += '</div>';
	txtMenu += '<div style="float:right;margin-top:56px;"><input id="pname" type="text" style="width:200px" placeholder=" 搜索商品"></input><img onclick="searchPro()" style="cursor:pointer;height:30px;margin-left:10px" src="../framework/search.png" /></div>';
	txtMenu += '<div style="clear:both"></div>';
	txtMenu += '</div>';
	$("#menu").html(txtMenu);

	var txtFooter = '';
	txtFooter += '<div class="w960">';
	txtFooter += '<div style="float:left;">';
	txtFooter += '<dl class="fdl"><dt class="fdll1" style="margin-top:19px" onclick="referTo(0)">首页</dt><dd></dd></dl>';
	txtFooter += '<dl class="fdl"><dt>关于我们</dt><dd onclick="referTo(1)">公司简介</dd><dd onclick="referTo(11)">最新消息</dd><dd onclick="referTo(12)">联系我们</dd></dl>';
	txtFooter += '<dl class="fdl"><dt>主营业务</dt><dd onclick="referTo(2)">自主售货机</dd><dd onclick="referTo(21)">预包装食品</dd><dd onclick="referTo(22)">电子设备</dd></dl>';
	txtFooter += '<dl class="fdl"><dt>在线商城</dt><dd onclick="referTo(3)">饮料系列</dd><dd onclick="referTo(3)">零食系列</dd><dd onclick="referTo(3)">甜点系列</dd><dd onclick="referTo(3)">冰淇凌系列</dd></dl>';
	txtFooter += '</div>';
	txtFooter += '<div style="float:left;margin-top:16px;margin-left:20px">';
	txtFooter += '<div class="footer_1">客服热线</div>';
	txtFooter += '<div class="footer_2">400-1223-2133</div>';
	txtFooter += '<div class="footer_3">工作时间：周一至周五9:00-18:00</div>';
	txtFooter += '</div>';
	txtFooter += '<div style="float:right;margin-top:20px;"><img src="../framework/barcode.png" /><br/><br/>微信公众号：<br/>aiyin</div>';
	txtFooter += '<div style="clear:both"></div>';
	txtFooter += '</div>';
	txtFooter += '<div class="w960" style="text-align:center;margin-top:80px;padding-bottom:10px">沪ICP证130164号<span style="margin-left:30px">Copyright ©</span> 2018 AIYIN All Rights Reserved.';
	txtFooter += '</div>';
	txtFooter += '<div id="logink" style="display:none;width:400px;height: 300px;border-radius: 20px;background: white;box-shadow:0px 0px 15px #888888; position: fixed;top:30%;left:40%;padding: 80px;">';
	txtFooter += '			<div style="margin-left:280px;margin-top:-70px;cursor:pointer;" onclick="closeWin()"><img src="../framework/cha.png"></div><br>';
	txtFooter += '			<div style="margin-left:90px;margin-top:-30px;">账号登陆</div><br>';
	txtFooter += '			<div><input type="text" id="mobile" style="width:240px;height: 32px;" name="" placeholder="手机号码"></div><br>';
	txtFooter += '			<div><input type="password" id="pwd" style="width:240px;height: 32px;" name="" placeholder="登陆密码"></div>';
	txtFooter += '			<div onclick="showForget()" style="margin:5px;width:240px;text-align:right;cursor:pointer;">忘记密码&nbsp;&nbsp;</div>';
	txtFooter += '			<div onclick="loginUser()" style="padding: 5px;background:rgb(5,165,210);display: inline-block;color:white;cursor: pointer;width:240px;text-align: center;border-radius: 5px;">登&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;陆</div>';
	txtFooter += '	</div>';

	txtFooter += '<div id="forgetk" style="display:none;width:400px;height: 300px;border-radius: 20px;background: white;box-shadow:0px 0px 15px #888888; position: fixed;top:30%;left:40%;padding: 80px;">';
	txtFooter += '			<div>请输入您的登陆名</div><br>';
	txtFooter += '			<div><input type="text" id="mobile1" style="width:240px;height: 32px;" name="" placeholder="手机号码"></div><br>';
	txtFooter += '			<div onclick="sendSMS()" style="padding: 5px;background:rgb(5,165,210);display: inline-block;color:white;cursor: pointer;width:240px;text-align: center;border-radius: 5px;">下一步</div>';
	txtFooter += '	</div>';

	txtFooter += '<div id="forgetk2" style="display:none;width:400px;height: 300px;border-radius: 20px;background: white;box-shadow:0px 0px 15px #888888; position: fixed;top:30%;left:40%;padding: 80px;">';
	txtFooter += '			<div>登陆密码已发送至您的手机，请查收。</div><br>';
	//txtFooter += '			<div><input type="text" id="mobile1" style="width:240px;height: 32px;" name="" placeholder="手机号码"></div><br>';
	txtFooter += '			<div onclick="gotologin()" style="padding: 5px;background:rgb(5,165,210);display: inline-block;color:white;cursor: pointer;width:240px;text-align: center;border-radius: 5px;">返回登陆</div>';
	txtFooter += '	</div>';

	$("#footer").html(txtFooter);

	var url = window.location.href;
	if(url.indexOf("index")!=-1){
		$("#m1").css("color","red");
	}
	if(url.indexOf("about")!=-1 || url.indexOf("linkus")!=-1 || url.indexOf("newinfo")!=-1){
		$("#m2").css("color","red");
	}
	if(url.indexOf("zy")!=-1){
		$("#m3").css("color","red");
	}
	if(url.indexOf("mall")!=-1){
		$("#m4").css("color","red");
	}
	getCartNum();
});

function closeWin(){
	$("#logink").css("display","none");
}

function setH(i){
	$("#HH1").removeClass("active1");
	$("#HH2").removeClass("active1");
	$("#HH3").removeClass("active1");
	$("#HH"+i).addClass("active1");
	if(i == 1){
		$("#IMG1").attr("src","../framework/a1.jpg");
		$("#IMG2").attr("src","../framework/a2.jpg");
		$("#IMG3").attr("src","../framework/a3.jpg");
	}else if(i==2){
		$("#IMG1").attr("src","../framework/b1.jpg");
		$("#IMG2").attr("src","../framework/b2.jpg");
		$("#IMG3").attr("src","../framework/b3.jpg");
	}else if(i==3){
		$("#IMG1").attr("src","../framework/c1.jpg");
		$("#IMG2").attr("src","../framework/c2.jpg");
		$("#IMG3").attr("src","../framework/c3.jpg");
	}
}

function searchPro(){
	sessionStorage.pname = $("#pname").val();
	window.location = 'mall.html';
}

function exitUser(){
	sessionStorage.authorize = 0;
	window.location = 'login.html';
}

function referTo(i){
	if(i==1){
		window.location = "about.html";
	}else if(i==0){
		window.location = "index.html";
	}else if(i==2){
		window.location = "zy1.html";
	}else if(i==3){
		window.location = "mall.html";
	}else if(i==11){
		window.location = "newinfo.html";
	}else if(i==12){
		window.location = "linkus.html";
	}else if(i==21){
		window.location = "zy2.html";
	}else if(i==22){
		window.location = "zy3.html";
	}
}

function showForget(){
	$("#logink").css("display","none");
	$("#forgetk").css("display","inline-block");
}

function openDetail(id){
	window.location = 'proDetail.html?id='+id;
}

function sendSMS(){
	var mobile = $("#mobile1").val();
	
	if(mobile == ""){
		alert("用户手机号必填！");return false;
    }
	$("#forgetk").css("display","none");
	$("#forgetk2").css("display","inline-block");
}

function loginUser(){
	var mobile = $("#mobile").val();
	var pwd = $("#pwd").val();
	if(mobile == ""){
		alert("用户手机号必填！");return false;
    }
    if(pwd == ""){
		alert("密码必填！");return false;
	}
	$.ajax({
		type: "post",
		url: "/service/checkUser",
		data: {
			mobile:mobile,
			pwd:pwd
		},
		success: function(data) {
			if(data == "200"){
				window.sessionStorage.sessionID = mobile;
				window.location.reload();
			}else{
				alert("登陆失败，用户名或密码错误！");
			}
		}
	});
}

function getCartNum(){
	$.ajax({
		type: "post",
		url: "/service/getCartNum",
		data: {
			sessionID:window.sessionStorage.sessionID
		},
		success: function(data) {
			if(data[0].count){
				$("#shopping-amount").html(data[0].count);
			}else{
				$("#shopping-amount").html("0");
			}
				
		}
	});
}

function gotoreg(){
	window.location = 'reg.html';
}

function gotologin(){
	$("#forgetk2").css("display","none");
	$("#logink").css("display","inline-block");
}

function gotologout(){
	sessionStorage.removeItem('sessionID');
	window.location.reload();
}

function referToCart(){
	window.location = 'cart.html';
}

function gotomy(){
	window.location = 'option.html';
}