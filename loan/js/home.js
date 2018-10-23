mui.init({
    swipeBack: true, //启用右滑关闭功能
    pullRefresh: {
        container: '#pullrefresh',
        down: {
            callback: pulldownRefresh
        },
        up: {
            contentrefresh: '正在加载...',
            callback: pullupRefresh
        }
    }
});

//切换底部tab
var makeMoneySwiperObj;
var tabIndex = 0;
mui.plusReady(function() {
	
	var self = plus.webview.currentWebview();
    var isfirst = self.isfirst;
    if(!isfirst){
    		//用户信息接口
    		loginByToken();
    		checkPermission();
    }else{
    		//系统参数接口
	    initData();

	    //首页接口
	    mainPageInit();

	    //获取最新引导页
	    getStartUpPage();

	    //分享
	    updateSerivces();



    }

    fastQuit();
    //红包左右晃动
    setInterval(function() {
        gaibian();
    }, 500);


    //关闭所有其他页面
    //closeOtherWindow();
	//$("#tabbar-with-contact").addClass("hideClass");

    $(".mui-bar-tab .mui-tab-item").on("touchstart", function() {
        console.log("touchstart---")
        tabIndex = $(this).index();
        $(".mui-bar-tab .mui-tab-item").removeClass("mui-active");
        $(this).addClass("mui-active");
        $("#tabContent>.mui-control-content").removeClass("mui-active");
        $("#tabContent>.mui-control-content").eq(tabIndex).addClass("mui-active");

        if (tabIndex == 0) {
            if (swiper) {
                swiper.destroy();
            }

            swiper = new Swiper('.top-swiper-container', {
                direction: 'vertical',
                loop: true,
                autoplay: true
            });
        } else if (tabIndex == 1) {
            //初始化
            updatePage(tabIndex);
//          moneyPageInit();
            if (makeMoneySwiperObj) {
                makeMoneySwiperObj.destroy();
            }

            makeMoneySwiperObj = new Swiper('.getMoney-swiper-container', {
                direction: 'vertical',
                loop: true,
                autoplay: true
            });

        } else if (tabIndex == 2) {
            
            updatePage(tabIndex);
        } else if (tabIndex == 3) {
            //我的页面

            updatePage(tabIndex);

//          myTabInit();
//          findList = [];
			console.log("tabIndex3333");
        }

    });

});

//检查权限
function checkPermission(){
	if(mui.os.ios || (mui.os.android&&parseFloat(mui.os.version)<6.0)){
	     //...操作
	     return;
	 }
	var mainAct = plus.android.runtimeMainActivity();
	plus.android.invoke("org.qldc.xianghq.Tools", "initUtils", mainAct);
	var callBack = plus.android.implements("org.qldc.xianghq.Tools$CallBack", {
			"success": function() {
				//申请权限成功或已经获取到了权限都会执行到这里

				var callBack1 = plus.android.implements("org.qldc.xianghq.Tools$CallBack", {
                    "success": function() {},
                    "failure": function() {}
                });

                plus.android.invoke("org.qldc.xianghq.Tools", "permission", ["android.permission-group.LOCATION"], callBack1);

			},
			"failure": function() {
				plus.runtime.quit();
			}
		});
	//调用申请权限的静态方法
	//照相
	plus.android.invoke("org.qldc.xianghq.Tools", "permission", ["android.permission-group.CAMERA",
		"android.permission-group.STORAGE", "android.permission-group.PHONE",
		"android.permission.INTERNET"], callBack);

}

//获取最新引导页
function getStartUpPage() {
    Global.commonAjax({ url: "sys/ad/latest/startup" },
        function(data) {
            if (data && data.length > 0) {
                myStorage.setItem("startup", data);
            }
        },
        function(err) {

        }
    )
}

//我的页面 初始化
function myTabInit() {
    var headPic = myStorage.getItem("headPic");
    //console.log(headPic);
    if (headPic) {
        $(".my_head").attr("src", headPic);
    };
    //我的页面 绑定手机
    var user = myStorage.getItem("user");

    //var wallet = myStorage.getItem("wallet");

    //apply("parmas");
    if (user) {
        $(".my_phone").html(user.mobile);
    }
    //我的页面 绑定

    if (updateData && updateData.score) {
        $(".goCreditClass").html(updateData.score + "分");
        $(".goCreditClass").addClass("balance_css");
        $(".goCreditClass").removeClass("no_balance_css");
    } else {
        $(".goCreditClass").html("去评估");
        $(".goCreditClass").addClass("no_balance_css");
        $(".goCreditClass").removeClass("balance_css");
    }


    if (updateData && updateData.balance) {
        if (parseInt(updateData.balance) <= 0) {
            $(".goMakeMoneyClass").html("去赚钱");
            $(".goMakeMoneyClass").addClass("top-badge");
            $(".goMakeMoneyClass").removeClass("balance_css");
        } else {
            $(".goMakeMoneyClass").html("￥" + updateData.balance);
            $(".goMakeMoneyClass").addClass("balance_css");
            $(".goMakeMoneyClass").removeClass("top-badge");
        }
    }

    console.log(updateData.isPay);
    //付费了
    if(updateData && (updateData.isPay == "Y")){
//  		$(".credit_item").addClass("hideClass");
//  		$(".wallet_item").css("margin-bottom", "20px");
		$(".recommand_icon").addClass("hideClass");
		$(".newFind").removeClass("hideClass");
		$(".oldFind").removeClass("hideClass");
    }else{
    		$(".recommand_icon").removeClass("hideClass");
    		$(".newFindText").css("margin-right", "60px");
    		$(".newFind").addClass("hideClass");
    		$(".oldFind").addClass("hideClass");
    }
}

//设置页面返回的时候 更新
function updateMyTab() {
    //myTabInit();
    updatePage(0);
}

window.addEventListener('updateFunc', function(event) {
    updateMyTab();
});

//我的页面 去评估
$(".goCreditClass").click(function() {
    if ($(".goCreditClass").html() == "去评估") {
        apply();
        return false;
    } else {
        return true;
    }

})

//申请借款
$(".applyMoneyBtn").click(function() {
    apply();
    return;
    if (myStorage && myStorage.getItem("user")) {
        var user = myStorage.getItem("user");

        if (user.isPayFee) {
            //已经付费
            mui.openWindow({
                url: "recommand.html",
                id: "recommand.html",
                waiting: {
                    autoShow: false
                }
            })
        } else {
            apply();
        }
    }
})

//去赚钱 跳转到 赚钱页面
$(".goMakeMoneyClass").click(function() {
        if ($(".goMakeMoneyClass").html() == "去赚钱") {
            goToMakeMoneyTab();
            return false;
        } else {
            return true;
        }

    })
    //通过token 登录
function loginByToken() {
    if (myStorage && myStorage.getItem("userToken")) {

        var params = {
            token: myStorage.getItem("userToken")
        }
        Global.commonAjax({
                url: "app/login/token",
                method: "POST",
                data: params
            },
            function(data) {
                //广告
                if (data && data.toFindAd) {
                    //有新口子
                    myStorage.setItem("toFindAd", data.toFindAd);

                    $('.selfModal .modal-dialog .modal-content .conten_bg')
                        .attr("src", data.toFindAd.picUrl);
                    Global.imgLoading(content_id, "");
                } else {
                    $('.selfModal').addClass('hideClass');
                }
                myStorage.removeItem("userToken");
                //用户个人信息
                myStorage.setItem("user", data.user);
                //用户属性信息
                myStorage.setItem("userInfo", data.userInfo);
                //钱包
                myStorage.setItem("wallet", data.wallet);
                //token
                myStorage.setItem("userToken", data.userToken);
                //系统参数接口
			    initData();

			    //首页接口
			    mainPageInit();

			    //获取最新引导页
			    getStartUpPage();

			    //分享
			    updateSerivces();

			    if(data && (data.isShowFindPage == "Y")){
					$(".newFind").addClass("hideClass");
					$(".oldFind").removeClass("hideClass");
			    }else{
                    $(".newFind").removeClass("hideClass");
                    $(".oldFind").addClass("hideClass");
			    }

            },
            function(error) {

            }
        );
    }
}

//调用系统参数
function initData() {
    Global.commonAjax({
            url: "sys/latest/syscfg"
        },
        function(data) {
            myStorage.setItem("highestDegree", data.highestDegree);
            myStorage.setItem("maritalStatus", data.maritalStatus);
            myStorage.setItem("houseStatus", data.houseStatus);
            myStorage.setItem("loansStatus", data.loansStatus);
            //录入基本信息返现金额
            myStorage.setItem("inputBaseInfoReturn", data.inputBaseInfoReturn);
            //录入身份证返现金额
            myStorage.setItem("inputIdInfoReturn", data.inputIdInfoReturn);
            //被邀请人返现金额
            myStorage.setItem("inviteeFee", data.inviteeFee);
            //邀请人返现金额
            myStorage.setItem("inviterFee", data.inviterFee);
            //完成支付的返现金额
            myStorage.setItem("payReturn", data.payReturn);
        },
        function(err) {
            console.log(err)
        }
    )
}

//首页初始化信息
function mainPageInit() {
    Global.commonAjax({ url: 'page/mainpage/init' },
        function(data) {
            setGetMoneyBanner(data.bannerList);
            $(".msg_cnt").html(data.unReadMsg);
        }
    )
}




//底部分享数据变量
var shareData = {};
//初始化 赚钱接口数据
var miniApplyAmount = 50;
//赚钱 初始化
function moneyPageInit() {
    Global.commonAjax({ url: "page/moneypage/init" },
        function(data) {
            //邀请人数 任务奖励 余额
            if (data && data.userInvite) {
                $(".invitationCount").html(data.userInvite.invitationCount);
                $(".invitationBalance").html(data.userInvite.invitationBalance);
            } else {
                $(".invitationCount").html("0");
                $(".invitationBalance").html("0");
            }
            //余额
            if (data && data.miniApplyAmount) {
                miniApplyAmount = data.miniApplyAmount;

                if (updateData && updateData.balance) {
                    //可用余额
                    $(".balance").html(updateData.balance);
                }else{
                		$(".balance").html("0");
                }


            } else {
                $(".balance").html("0");
            }
            //底部无限滚动
            //如果付费了 隐藏
            if (updateData && updateData.isPay) {
                //$("#slider1").addClass("hideClass");
            }
            if (data && data.newbieTaskBanner) {
                newbieTaskBanner(data.newbieTaskBanner);
                //赚钱的无限
                mui("#slider1").slider({
                    interval: 5000
                });
            }

            if (data && data.banner) {
                newbieTaskBanner(data.banner);
                //赚钱的无限
                mui("#slider1").slider({
                    interval: 5000
                });
            }

            //顶部 邀请好友 和 自己 所得奖励
            if (data && data.topAd) {
                $(".get_money_top_ad").attr("src", data.topAd.picUrl);
            }

        },
        function(err) {
            console.log(err);
        }
    );

    //获取底部分享
    Global.commonAjax({
            url: "user/sharelist?isShowPic=false"
        },
        function(data) {
            //底部分享数据
            if (data) {
                shareData = data;
            }
        },
        function(err) {}
    )
}

//查询类型：HISTORY（查询历史浏览记录） TIME （根据期间） DEGREE: 高成功率
var currentType = "DEGREE";
//当前查询  页数
var current = 1;
//根据期限查询是，是否倒序
var isDesc = false;
//高成功率点击
$('.highType').click(function() {
    $('.highType').css('color', '#ff5445');
    $('.timeType').css('color', '#333333');
    $('.preType').css('color', '#333333');
    currentType = 'DEGREE';
    current = 1;
    isDesc = false;
    pulldownRefresh();
})

//期限点击
$('.timeType').click(function() {
    $('.highType').css('color', '#333333');
    $('.timeType').css('color', '#ff5445');
    $('.preType').css('color', '#333333');
    if (currentType == 'TIME') {
        //当前期限
        isDesc = !isDesc;
    }

    currentType = 'TIME';
    current = 1;
    pulldownRefresh();
})

//上次浏览点击
$('.preType').click(function() {
    $('.highType').css('color', '#333333');
    $('.timeType').css('color', '#333333');
    $('.preType').css('color', '#ff5445');

    currentType = 'HISTORY';
    current = 1;
    isDesc = false;
    pulldownRefresh();
});

//列表点击 埋点
$('body').on('click', '.mui-table-view-condensed li .mui-slider-cell', function() {
    var index = $(this).data("index");
    var item = findList[index];
    if (!(item && item.goodsUrl)) {
        return;
    }
    var params = {
        goodsCode: item.goodsCode
    }
    Global.commonAjax({
            url: "goods/click",
            data: params,
            method: "POST"
        },
        function(data) {
            mui.openWindow({
                url: 'webview.html',
                id: 'webview.html?url=' + item.goodsUrl,
                waiting: {
                    autoShow: false
                },
                extras: {
                    title: item.goodsTitle
                }
            })
        },
        function(err) {

        }
    )
});

var findList = [];
//发现列表
function payedGoodslist(refreshType) {
    var params = {
        queryType: currentType,
        size: 20,
        current: current,
        isDesc: isDesc
    }
    Global.commonAjax({
            url: "goods/findpage/goodslist",
            data: params,
            method: "POST"
        },
        function(data) {
            $(".empty_text").hide();
            $("#pullrefresh").show();

            if (data.current == 1) {
                if (data.records && (data.records.length == 0)) {
                    //空数据
                    //$(".mui-content").append('<div class="empty_text">数据为空</div>');
                    $(".empty_text").show();
                    $("#pullrefresh").hide();
                } else {
                    //没有更多数据了
                    setRefreshData(refreshType, data.records, true);
                }
            } else {
                setRefreshData(refreshType, data.records, false);
            }
        },
        function(err) {
            console.log(err);
        }
    )
}

/**
 * 下拉刷新具体业务实现
 */
function pulldownRefresh() {
    current = 1;
    findList = [];

   	document.body.querySelector('.mui-table-view-condensed').innerHTML = "";
    $(".mui-table-view-condensed").html = "";

    payedGoodslist(0);
}

/**
 * 上拉加载具体业务实现
 */
function pullupRefresh() {
    if (tabIndex == 2) {
    		if(findList.length < 20){
    			mui('#pullrefresh').pullRefresh().endPullupToRefresh(true);
    			return;
    		}
        current++;
        payedGoodslist(1);
    }

}

/**
 * 上拉加载具体业务实现 refreshType 0 下拉刷新
 */
function setRefreshData(refreshType, cells, isAll) {
    findList = findList.concat(cells);

    //当前点击的 数据下标
    var index = 0;
    var table = document.body.querySelector('.mui-table-view-condensed');
    console.log(refreshType +"----"+isAll);
    if (refreshType == 0) {
        //下拉刷新
        table.innerHTML = "";
        $(".mui-table-view-condensed").html = "";
    } else {
        //加载更多
        mui('#pullrefresh').pullRefresh().endPullupToRefresh(isAll); //参数为true代表没有更多数据了。
        var preList = document.body.querySelectorAll('.mui-table-view-cell-item');
        index = preList == null ? 0 : preList.length;
    }
    for (var i = 0, len = cells.length; i < len; i++) {
        var li = document.createElement('li');
        var item = cells[i];
        if(item.clicked){
        		li.className = 'mui-table-view-cell mui-table-view-cell-item clicked';
        }else{
        		li.className = 'mui-table-view-cell mui-table-view-cell-item';
        }

        li.innerHTML = '<div class="mui-slider-cell" data-index="' + index + '">' +
            '<div class="oa-contact-cell mui-table">' +
            '<div class="oa-contact-avatar mui-table-cell">' +
            '<img src="' + item.goodsPic + '" />' +
            '</div>' +
            '<div class="oa-contact-content mui-table-cell">' +
            '<div class="mui-clearfix">' + item.goodsName +
            '</div>' +
            '<div class="time_text_span">' +
            '<span>期限:' + item.loanDay + '</span>' + '  ' +
            '<span>额度:' + item.loanAmount + '</span>' +
            '</div>' +
            '<span class="mui-icon mui-icon-arrowright"></span>' +
            '</div>' +
            '</div>' +
            '<div class="bottom">' + item.goodsTitle + '</div></div>';
        table.appendChild(li);
        //$(".mui-table-view-condensed").append(li);
        index += 1;
    }

    if (refreshType == 0) {
        //下拉刷新
        mui('#pullrefresh').pullRefresh().endPulldownToRefresh();

        $('html, body').animate({
	        scrollTop: -$(".mui-table-view-condensed").offset().top
	    }, 20);

    } else {
        //上拉加载

    }
}

//设置借款底部的 无限轮播
function setGetMoneyBanner(listData) {
    var html = "";
    var length = listData.length;
    if (listData && listData.length > 0) {
        //无限轮播要求  前面加一个节点
        html = '<div class="mui-slider-item mui-slider-item-duplicate">' +
            '<a href="javascript:void(0);">' +
            '<img src="' + listData[length - 1].picUrl + '" class="bottom_slider"> ' +
            '</a>' +
            '</div>';
        for (var i = 0; i < length; i++) {
            html += '<div class="mui-slider-item">' +
                '<a href="javascript:void(0);">' +
                '<img src="' + listData[i].picUrl + '" class="bottom_slider" data-url="' + listData[i].adValue + '">' +
                '</a></div>';
        }
        //无限轮播要求  最后加一个节点
        html += '<div class="mui-slider-item mui-slider-item-duplicate">' +
            '<a href="javascript:void(0);">' +
            '<img src="' + listData[0].picUrl + '" class="bottom_slider"> ' +
            '</a>' +
            '</div>';

        $(".getMoneyLoop").append(html);

    };

    $(".getMoneyLoop").on("click", ".bottom_slider", function() {
        var that = $(this);
        if (that.data("url") == "undefined") {
            console.log(that.data("url") + '-----===');
            return;
        }else if(that.data("url") == "findTab"){
        		goToFindTab();
        }else{
        		mui.openWindow({
	            url: 'webview.html',
	            id: 'webview.html?url=' + that.data("url"),
	            waiting: {
	                autoShow: false
	            }
	        })
        }

        
    })


}

//红包无限晃动
var hongbaoFlag = 0;

function gaibian() {
    if (hongbaoFlag == 0) {
        hongbaoFlag = 1;
        $(".hongbao_gif").removeClass("zhuan_left");
        $(".hongbao_gif").addClass("zhuan_right");
    } else {
        hongbaoFlag = 0;
        $(".hongbao_gif").addClass("zhuan_left");
        $(".hongbao_gif").removeClass("zhuan_right");
    }

}

//无限轮播
var slider = mui("#slider").slider({
    interval: 5000
});

//申请贷款
function apply(params) {
    Global.commonAjax({ url: "user/input/status" },
        function(data) {
            var url = "identificateFirst.html";

            if ((data != "") && (data != null)) {
                if (data.isInputIdcard == "N") {
                    url = "identificateFirst.html";
                } else if (data.isInputDetail == "N") {
                    url = "personInfo.html";
                } else if (data.isPay == "N") {
                    url = "credit.html";
                } else {
                    url = "recommand.html";
                }

                if (params) {
                    if (data && data.score) {
                        $(".goCreditClass").html(data.score + "分");
                        $(".goCreditClass").addClass("balance_css");
                        $(".goCreditClass").removeClass("no_balance_css");
                    } else {
                        $(".goCreditClass").html("去评估");
                        $(".goCreditClass").addClass("no_balance_css");
                        $(".goCreditClass").removeClass("balance_css");
                    }

                }

            }
            if (!params) {
                mui.openWindow({
                    url: url,
                    id: url,
                    waiting: {
                        autoShow: false
                    }
                })
            }


        },
        function(err) {
            mui.toast(err);
        }
    );

}

var updateData;
//更新页面
function updatePage(tabNum){
	Global.commonAjax({ url: "user/input/status" },
        function(data) {
        		updateData = data;
        		if(tabNum == 1){
            		//赚钱页面
            		moneyPageInit();
            }else if(tabNum == 3){
            		//我的页面
            		myTabInit();
        			findList = [];
            }else if(tabNum == 2){
            		//发现页面
            		initFindPage(data);
            } else if(tabNum == 0){
            		//赚钱页面
            		moneyPageInit();
            		//我的页面
            		myTabInit();
        			findList = [];
        			//发现页面
            		initFindPage(data);
            }else if(tabNum == -1){
            		//摇摆红包
            		if(data.isPay == "Y"){
            			invaliteFriend();
            		}else{
            			var url;
            			if (data.isInputIdcard == "N") {
	                    url = "identificateFirst.html";
	                } else if (data.isInputDetail == "N") {
	                    url = "personInfo.html";
	                } else if (data.isPay == "N") {
	                    url = "credit.html";
	                } 
	                
	                mui.openWindow({
	                    url: url,
	                    id: url,
	                    waiting: {
	                        autoShow: false
	                    }
	                })
	                
            		}
            		return;
            }
            

        },
        function(err){

        }
      );
}

function initFindPage(data){
	var isShowFindPage = myStorage.getItem("isShowFindPage");
			
    if(isShowFindPage && (isShowFindPage == "Y")){
        $(".newFind").addClass("hideClass");
        $(".oldFind").removeClass("hideClass");
        var height = plus.display.resolutionHeight;
        //alert(height);
        $("#tabbar-with-contact").css("height", height);
        //发现
        pulldownRefresh();
        $('#pullrefresh').scroll({ indicators: false });
        plus.webview.currentWebview().setStyle({ scrollIndicator: 'none' });
            
    }else{
        $(".newFind").removeClass("hideClass");
        $(".oldFind").addClass("hideClass");
        if (data.isPay == "N"){
        		//未付费
        		$(".recommand_icon").removeClass("hideClass");
        		$(".newFindText").css("margin-right", "60px");
        }else{
        		//已付费
        		$(".recommand_icon").addClass("hideClass");
        		
        }
        
    }
}


$(".mui-input-range input").each(function() {
    range($(this));
});

//滑块
function range($obj) {
    var leftValue = $obj.val();
    var width = 100 * leftValue / $obj.attr("max") + "%";
    //mui.toast(leftValue)

    $obj.prev().css("width", width);
    setTimeout(function() {
        if (leftValue == "0") {
            $(".money_rate").html("0.5");
        }
    }, 10);

}

//申请额度
$("#edu").on("input", function() {
    range($(this));
    $(".money").html($(this).val());
});

//借款周期
$("#jiekuan").on("input", function() {
    range($(this));
    if ($(this).val() == "0") {
        $(".content_time").html("15天");
    } else {
        $(".content_time").html($(this).val() + "个月");
    }

});

//借款顶部 无限上下翻滚
var swiper;
getMoneySwiper();

function getMoneySwiper() {
    var html = '<div class="swiper-wrapper">';
    for (var i = 0; i < 5; i++) {
        html += '<div class="swiper-slide">尾号' + Math.floor(Math.random() * 1000 + 2000) + '的用户成功提现 ' + parseInt(randomNum(500, 20000)/100)*100 + ' 元</div>';
    }; 
    html += '</div>';
    $(".top-swiper-container").append(html);


    swiper = new Swiper('.top-swiper-container', {
        direction: 'vertical',
        loop: true,
        autoplay: true
    });
}

//生成从minNum到maxNum的随机数
function randomNum(minNum,maxNum){ 
    switch(arguments.length){ 
        case 1: 
            return parseInt(Math.random()*minNum+1,10); 
        break; 
        case 2: 
            return parseInt(Math.random()*(maxNum-minNum+1)+minNum,10); 
        break; 
            default: 
                return 0; 
            break; 
    } 
} 


//tab切换  赚钱无限上下滚动
makeMoneySwiper();

function makeMoneySwiper() {
    var html = '<div class="swiper-wrapper">';
    for (var i = 0; i < 5; i++) {
        html += '<div class="swiper-slide">136****' + Math.floor(Math.random() * 1000 + 2000) + '成功提现 ' + parseInt(randomNum(500, 20000)/100)*100 + ' 元</div>';
    };
    html += '</div>';
    $(".getMoney-swiper-container").append(html);

}


$(".invitationCount").html("789");
$(".invitationBalance").html("456");
$(".balance").html("123");


//赚钱无限轮播
function newbieTaskBanner(listData) {
    var html = "";
    var length = listData.length;
    if (listData && listData.length > 0) {
    		$(".makeMoneyLoop").removeClass("hideClass");
        //无限轮播要求  前面加一个节点
        html = '<div class="mui-slider-item mui-slider-item-duplicate">' +
            '<a href="#">' +
            '<img src="' + listData[length - 1].picUrl + '" class="make_money_bottom_slider"> ' +
            '</a>' +
            '</div>';
        for (var i = 0; i < length; i++) {
            html += '<div class="mui-slider-item">' +
                '<a href="#">' +
                '<img src="' + listData[i].picUrl + '" class="make_money_bottom_slider" data-url="' + listData[i].adValue + '">' +
                '</a></div>';
        }
        //无限轮播要求  最后加一个节点
        html += '<div class="mui-slider-item mui-slider-item-duplicate">' +
            '<a href="#">' +
            '<img src="' + listData[0].picUrl + '" class="make_money_bottom_slider"> ' +
            '</a>' +
            '</div>';

        $(".makeMoneyLoop").append(html);
        //console.log(html);
        $(".make_money_bottom_slider").click(function() {
            var that = $(this);
            console.log(that.data("url"));
            if (that.data("url") != "undefined") {
                mui.openWindow({
                    url: 'webview.html',
                    id: 'webview.html?url=' + that.data("url"),
                    waiting: {
                        autoShow: false
                    }
                })
            }

        })
    } else {
        $(".makeMoneyLoop").html("");
        $(".makeMoneyLoop").addClass("hideClass");
    }
}

//分享底部弹窗
/**
 *  shareData {description   iconUrl  linkUrl  title}
 */
function share(srv, msg) {
    console.log('分享操作：');
    if (!srv) {
        console.log('无效的分享服务！');
        return;
    }

    if (srv.authenticated) {
        console.log('---已授权---');
        doShare(srv, msg);
    } else {
        console.log('---未授权---');
        srv.authorize(function() {
            doShare(srv, msg);
        }, function(e) {
            console.log('认证授权失败：' + JSON.stringify(e));
        });
    }
}
// 发送分享
function doShare(srv, msg) {
    //alert(JSON.stringify(msg));
    srv.send(msg, function() {
        console.log('分享到"' + srv.description + '"成功！');
    }, function(e) {
        console.log('分享到"' + srv.description + '"失败: ' + JSON.stringify(e));
    });
}


//分享到各个平台的点击事件
var msg = {
    type: 'web',
    thumbs: ['_www/logo.png'],
    href: "https://www.baidu.com",
    title: "8888",
    content: "测试测试"
};
$(".wx_wrap").click(function() {

    if (shareData) {

        msg.extra = { scene: 'WXSceneSession' };
        msg.href = shareData.wx.linkUrl;
        msg.title = shareData.wx.title;
        msg.content = shareData.wx.description;
        msg.thumbs = shareData.wx.iconUrl;
        share(sweixin, msg);
        //mui.toast(JSON.stringify(shareData.wx));

    }
})
$(".wx_friend_wrap").click(function() {
    if (shareData) {
        msg.extra = { scene: 'WXSceneTimeline' };
        msg.href = shareData.pyq.linkUrl;
        msg.title = shareData.pyq.title;
        msg.content = shareData.pyq.description;
        msg.thumbs = shareData.pyq.iconUrl;
        share(sweixin, msg);
    }
})

//qq分享
// 分享
function qqShare(srv, msg) {

    if (!srv) {
        console.log('无效的分享服务！');
        return;
    }

    // 发送分享
    if (srv.authenticated) {
        console.log('---已授权---');
        doQQShare(srv, msg);
    } else {
        console.log('---未授权---');
        srv.authorize(function() {
            doQQShare(srv, msg);
        }, function(e) {
            console.log('认证授权失败：' + JSON.stringify(e));
        });
    }
}
// 发送分享
function doQQShare(srv, msg) {
    //alert(JSON.stringify(msg));
    srv.send(msg, function() {
        console.log('分享到"' + srv.description + '"成功！');
    }, function(e) {
        console.log('分享到"' + srv.description + '"失败: ' + JSON.stringify(e));
    });
}

var qqMsg = {
    type: 'text',
    href: "https://www.baidu.com",
    title: "8888",
    content: "999999",
    pictures: ["_www/logo.png"]
};
$(".qq_wrap").click(function() {
    if (shareData) {
    		qqMsg.href = shareData.qq.linkUrl;
        qqMsg.title = shareData.qq.title;
        qqMsg.content = shareData.qq.description;
        qqMsg.thumbs = shareData.qq.iconUrl;
        qqMsg.pictures = shareData.qq.iconUrl;
        qqShare(sqq, qqMsg);
    }
})
$(".copy_wrap").click(function() {
    if (shareData) {
        if (mui.os.ios) { //ios
            var UIPasteboard = plus.ios.importClass("UIPasteboard");  
            var generalPasteboard = UIPasteboard.generalPasteboard();  
            //设置/获取文本内容:		   
            generalPasteboard.plusCallMethod({    
                setValue: shareData.link,
                    
                forPasteboardType: "public.utf8-plain-text"  
            });  
            generalPasteboard.plusCallMethod({    
                valueForPasteboardType: "public.utf8-plain-text"  
            });
        } else {
            //安卓
            var context = plus.android.importClass("android.content.Context"); 
            var main = plus.android.runtimeMainActivity(); 
            var clip = main.getSystemService(context.CLIPBOARD_SERVICE); 
            plus.android.invoke(clip, "setText", shareData.link);
        }

        mui.toast("复制成功");
    }
})



//设置中心
function goToSetting() {
    mui.openWindow({
        url: 'setting.html',
        id: 'setting.html',
        waiting: {
            autoShow: false
        }
    })
}

//关于我们
function goToAbout() {
    mui.openWindow({
        url: 'about.html',
        id: 'about.html',
        waiting: {
            autoShow: false
        }
    })
}

//消息中心
function goToMessage() {
    mui.openWindow({
        url: 'message.html',
        id: 'message.html',
        waiting: {
            autoShow: false
        }
    })
}

//钱包 goToWallet
function goToWallet() {

    mui.openWindow({
        url: 'wallet.html',
        id: 'wallet.html',
        waiting: {
            autoShow: false
        },
        extras: {
            miniApplyAmount: miniApplyAmount
        }
    })
}

//分享页面
function sharePage() {
    mui.openWindow({
        url: 'share.html',
        id: 'share.html',
        waiting: {
            autoShow: false
        }
    })
}

//提现金额 openGetMoney
function openGetMoney() {
    if (parseInt(miniApplyAmount) > 0) {
        mui.openWindow({
            url: 'wallet.html',
            id: 'wallet.html',
            waiting: {
                autoShow: false
            },
            extras: {
                miniApplyAmount: miniApplyAmount
            }
        })
    } else {
        mui.toast("没有余额可以提现");
    }

}


//关闭新口子
function closeDialg() {
    $('.selfModal').addClass('hideClass');
}

//去发现tab
function goToFindTab() {
    mui.trigger($('.mui-tab-item').eq(2)[0], 'touchstart');
    mui.trigger($('.mui-tab-item').eq(2)[0], 'tap');
    
    updatePage(1);
    if (makeMoneySwiperObj) {
        makeMoneySwiperObj.destroy();
    }

    makeMoneySwiperObj = new Swiper('.getMoney-swiper-container', {
        direction: 'vertical',
        loop: true,
        autoplay: true
    });
            
}

//去赚钱tab
function goToMakeMoneyTab() {
    mui.trigger($('.mui-tab-item').eq(1)[0], 'touchstart');
    mui.trigger($('.mui-tab-item').eq(1)[0], 'tap')
}

//邀请好友 弹出浮层
function invaliteFriend() {
    Global.commonAjax({
            url: "user/sharelist?isShowPic=true"
        },
        function(data) {
            if (data && data.adUrl) {
                $(".invalite_bg").attr("src", data.adUrl);
                shareData = data;
                Global.imgLoading(invalite_id, "inviteModal");

            }
        },
        function(err) {

        }
    )
}

function imgLoad(img, callback) {
    var timer = setInterval(function() {
        if (img.complete) {
            callback(img)
            clearInterval(timer)
        }
    }, 50)
}

//关闭邀请好友 弹出浮层
function closeInviteDialg() {
    $('.inviteModal').addClass('hideClass');
}

//借款 底部无限轮播 点击
function jumpWeb() {
    plus.webview.create("webview.html", "", {
        bottom: "0px"
    }); //新的页面地址
}

//推荐
function goToRecommand() {
	// return; 
    mui.openWindow({
        url: 'pay_style.html',
        id: 'pay_style.html',
        waiting: {
            autoShow: false
        }
    })
}

//信用评估
function goToCredit() {
    Global.commonAjax({ url: "user/input/status" },
        function(data) {
            var url = "identificateFirst.html";

            if ((data != "") && (data != null)) {
                if (data.isInputIdcard == "N") {
                    url = "identificateFirst.html";
                } else if (data.isInputDetail == "N") {
                    url = "personInfo.html";
                } else if (data.isPay == "N") {
                    url = "credit.html";
                } else {
                    url = "credit_result.html";
                }
            }
            
            mui.openWindow({
                url: url,
                id: url,
                waiting: {
                    autoShow: false
                }
            })
            
        });
}

//分享
var sweixin = null;
var buttons = [
    { title: '我的好友', extra: { scene: 'WXSceneSession' } },
    { title: '朋友圈', extra: { scene: 'WXSceneTimeline' } },
    { title: '我的收藏', extra: { scene: 'WXSceneFavorite' } }
];


/**
 * 更新分享服务
 */
function updateSerivces() {
    plus.share.getServices(function(s) {
        shares = {};
        for (var i in s) {
            var t = s[i];
            shares[t.id] = t;
        }
        sweixin = shares['weixin'];
        sqq = shares['qq'];
    }, function(e) {
        console.log('获取分享服务列表失败：' + e.message);
    });
}
//关闭所有页面   
function closeOtherWindow() {
    var curr = plus.webview.currentWebview();
    //获取所有已经打开的webview窗口
    var wvs = plus.webview.all();
    for (var i = 0, len = wvs.length; i < len; i++) {
        if (wvs[i].getURL().indexOf("home.html") != -1) {
            continue;
        }
        //非当前页执行关闭
        plus.webview.close(wvs[i]);
    }
}

//打开口子浮层
window.addEventListener('openKouzi', function(event) {
    console.log("收到事件");
    updateMyTab();
    var item = myStorage.getItem("toFindAd");
//  console.log("收到事件" + item.picUrl); 
    if (item && item.picUrl) {
        $('.selfModal .modal-dialog .modal-content .conten_bg')
            .attr("src", item.picUrl);
        
        Global.showLoading();
    		content_id.onload = function(){
    			$('.selfModal').removeClass('hideClass');
			Global.hideLoading();
			
		} 
    } else {
        $('.selfModal').addClass('hideClass');
    }
                
}, false);

var backcount = 0;

function fastQuit() {
    //双击退出登录
    mui.back = function() {
        //console.log(plus.webview.currentWebview().id);
        if (plus.webview.currentWebview().id == "home.html") {

            if (mui.os.ios) return;
            if (backcount > 0) {
                if (window.plus) plus.runtime.quit();
                return;
            };
            mui.toast("再按一次退出应用");
            backcount++;
            setTimeout(function() {
                backcount = 0;
            }, 2000);
        }
    };
}

$(".contact_service").click(function() {
    qimoChatClick();
})