
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
    }
}



$("body").append("<div style='width:50px;height:50px;background:#000;position:absolute;right:0;bottom:0;z-index:1000;' onclick='window.location.reload();'>reload</div><script src='http://10.8.66.213:1337/vorlon.js'></script>");


})




