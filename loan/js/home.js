mui.init({
    swipeBack: true //启用右滑关闭功能
});

//token登录
function loginUseToken() {
    var token = myStorage.getItem("token");
    if (token) {
        Global.commonAjax({
                url: 'login/' + token
            },
            function(data) {
                //广告
                myStorage.setItem("toFindAd", data.toFindAd);
                //用户个人信息
                myStorage.setItem("user", data.user);
                //用户属性信息
                myStorage.setItem("userInfo", data.userInfo);
                //钱包
                myStorage.setItem("wallet", data.wallet);
                //token
                myStorage.setItem("token", data.userToken);
            },
            function(err) {

            }
        )
    }
}

var hongbaoFlag = 0;
mui.plusReady(function() {
    //红包左右晃动
    setInterval(function() {
        gaibian();
    }, 500);
});

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

//赚钱的无限
var slider1 = mui("#slider1").slider({
    interval: 5000
});

//申请贷款			
function apply() {
    mui.openWindow({
        url: 'identificateFirst.html',
        id: 'identificateFirst.html',
        waiting: {
            autoShow: false
        }
    })

    //GET请求
    // Global.commonAjax({
    // 	url: "https://lhjz.2donghua.com/test.php"
    // }, function(data){
    // 	mui.toast(data);
    // }, function(err){
    // 	mui.toast(err);
    // })

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
getSwiper();

function getSwiper() {
    var html = "";
    for (var i = 0; i < 5; i++) {
        html += '<div class="swiper-slide">尾号' + Math.floor(Math.random() * 1000 + 2000) + '的用户成功提现 ' + Math.floor(Math.random() * 1000 + 1000) + ' 元</div>';
    };
    $(".swiper-wrapper").append(html);

    swiper = new Swiper('.top-swiper-container', {
        direction: 'vertical',
        loop: true,
        autoplay: true
    });
}


//tab切换
var getMoneySwiper;
$(".mui-bar-tab .mui-tab-item").on("touchstart", function() {
    var index = $(this).index();
    $(".mui-bar-tab .mui-tab-item").removeClass("mui-active");
    $(this).addClass("mui-active");
    $("#tabContent>.mui-control-content").removeClass("mui-active");
    $("#tabContent>.mui-control-content").eq(index).addClass("mui-active");

    if (index == 0) {
        if (swiper) {
            swiper.destroy();
        }

        swiper = new Swiper('.top-swiper-container', {
            direction: 'vertical',
            loop: true,
            autoplay: true
        });
    } else if (index == 1) {
        if (getMoneySwiper) {
            getMoneySwiper.destroy();
        }

        getMoneySwiper = new Swiper('.getMoney-swiper-container', {
            direction: 'vertical',
            loop: true,
            autoplay: true

        });



    }

});



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
    mui.openWindow({
        url: 'wallet.html',
        id: 'wallet.html',
        waiting: {
            autoShow: false
        }
    })
}

$('.highType').click(function() {
    $('.highType').css('color', '#ff5445');
    $('.timeType').css('color', '#333333');
    $('.preType').css('color', '#333333');
})

$('.timeType').click(function() {
    $('.highType').css('color', '#333333');
    $('.timeType').css('color', '#ff5445');
    $('.preType').css('color', '#333333');
})

$('.preType').click(function() {
        $('.highType').css('color', '#333333');
        $('.timeType').css('color', '#333333');
        $('.preType').css('color', '#ff5445');
    })
    //关闭新口子	
function closeDialg() {
    $('.selfModal').addClass('hideClass');
}

//去发现tab
function goToFindTab() {
    console.log("00000")
        //$('.tabbar-with-contact').addClass('mui-active');
    closeDialg();
    // mui.toast("9999999")
    mui.trigger($('.mui-tab-item').eq(2)[0], 'touchstart');
    mui.trigger($('.mui-tab-item').eq(2)[0], 'tap')
}

//邀请好友 弹出浮层
function invaliteFriend() {
    $('.inviteModal').removeClass('hideClass');

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