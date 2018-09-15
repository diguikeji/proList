
var Global={};

$(function()
{

    Global={
    showLoading:function()
    {
        if($("#ShowLoading").length==0)
        {
            $("body").append("<div id='ShowLoading' style='width:100%;height:100%;background:rgba(0,0,0,0.5);display:table;position: absolute;left:0;top:0;z-index:1000000;'><div style='width:100%;text-align:center;vertical-align:middle;display: table-cell;'><img src='../images/loading.gif'/></div></div>");
        }
    },
    hideLoading:function()
    {
        $("#ShowLoading").remove();
    },
    error500:function()
    {
    	//$(".mui-content").html('<div class="error-col"><img src="../images/error/500.png"/><button type="button" class="mui-btn mui-btn-outlined go-home" >返回首页</button></div>');
		mui.openWindow({
      			url: 'error500.html',
      			id: 'error500.html',
			    waiting:{
			      autoShow:false
			    }
      		})
    },
    error404:function()
    {
    	//$(".mui-content").html('<div class="error-col"><img src="../images/error/404.png"/><button type="button" class="mui-btn mui-btn-outlined go-home" >返回首页</button></div>');
			mui.openWindow({
      			url: 'error404.html',
      			id: 'error404.html',
			    waiting:{
			      autoShow:false
			    }
      		})
    },
     errorNet:function()
    {
    	//$(".mui-content").html('<div class="error-col"><img src="../images/error/wangluo.png"/><button type="button" class="mui-btn mui-btn-outlined go-home" >返回首页</button></div>');
		mui.openWindow({
      			url: 'errornet.html',
      			id: 'errornet.html',
			    waiting:{
			      autoShow:false
			    }
      		})
    },
    errorDetail:function()
    {
    	$(".mui-content").html('<div class="error-col"><img src="../images/error/tixian.png"/></div>');
	
    },
    errorNews:function()
    {
    	$(".mui-content").html('<div class="error-col"><img src="../images/error/xiaoxi.png"/></div>');
	
    },
    commonAjax:function(params, callback)
    {
    		$.ajax({
	        url: params.url,
	        dataType: params.dataType,
	        cache: false,
	        async: true,
	        type: params.method,
	        data: params.data,
	        timeout:10000,
	        beforeSend:function(data){
	        		Global.showLoading();
	        },
	        success:function(data){
	        		Global.hideLoading();
	             callback(data);
	        },
	        error:function(data){
	        		Global.hideLoading();
	            mui.alert(data.msg);
	        },
	        complete:function(xhr, status){
	        		Global.hideLoading();
	        		if(status == 'error'){
	        			Global.error404();
	        		}else if(status == 'timeout'){
	        			Global.error500();
	        		}else{
	        			Global.errorNet();
	        		}
	        }
	    });
    }
    
    
}


$(".mui-content").on("click",".go-home",function()
{
	mui.openWindow({
      			url: 'home.html',
      			id: 'home.html.html',
			    waiting:{
			      autoShow:false
			    }
      		})
	
});

//$("body").append("<div style='width:50px;height:50px;background:#000;position:absolute;right:0;bottom:0;z-index:1000;' onclick='window.location.reload();'>reload</div><script src='http://10.8.66.213:1337/vorlon.js'></script>");


})




