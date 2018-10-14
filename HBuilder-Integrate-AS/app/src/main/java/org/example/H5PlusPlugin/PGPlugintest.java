package org.example.H5PlusPlugin;
import io.dcloud.common.DHInterface.AbsMgr;
import io.dcloud.common.DHInterface.IWebview;
import io.dcloud.common.DHInterface.StandardFeature;
import io.dcloud.common.util.JSUtil;
import win.smartown.android.library.certificateCamera.CameraActivity;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.qldc.xianghq.R;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.graphics.BitmapFactory;
import android.os.Bundle;
import android.os.Handler;
import android.text.TextUtils;
import android.util.Log;
import android.widget.Toast;

import cn.jpush.android.api.JPushInterface;
import cn.jpush.android.api.TagAliasCallback;

import java.util.Set;


/**
 * 5+ SDK 扩展插件示例
 * 5+ 扩扎插件在使用时需要以下两个地方进行配置
 * 		1  WebApp的mainfest.json文件的permissions节点下添加JS标识
 * 		2  assets/data/properties.xml文件添加JS标识和原生类的对应关系
 * 本插件对应的JS文件在 assets/apps/H5Plugin/js/test.js
 * 本插件对应的使用的HTML assest/apps/H5plugin/index.html
 * 
 * 更详细说明请参考文档http://ask.dcloud.net.cn/article/66
 * **/
public class PGPlugintest extends StandardFeature
{

    public Context  pContext;

    public void onStart(Context pContext, Bundle pSavedInstanceState, String[] pRuntimeArgs) {

        Log.i("dianji", "start");
        this.pContext=pContext;

        JPushInterface.setDebugMode(true);
        JPushInterface.init(pContext);


        /**
         * 如果需要在应用启动时进行初始化，可以继承这个方法，并在properties.xml文件的service节点添加扩展插件的注册即可触发onStart方法
         * */
    }

    public void PluginTestFunction(IWebview pWebview, JSONArray array)
    {


        this.pContext=pWebview.getActivity();
        Log.i("dianji", "setAlias："+pContext);



    	// 原生代码中获取JS层传递的参数，
    	// 参数的获取顺序与JS层传递的顺序一致
        String CallBackID = array.optString(0);
        JSONArray newArray = new JSONArray();
        newArray.put(array.optString(1));
        setAlias(array.optString(1));
        newArray.put(array.optString(2));
        newArray.put(array.optString(3));
        newArray.put(array.optString(4));


        Log.i("dianji", "kaishi");


        // 调用方法将原生代码的执行结果返回给js层并触发相应的JS层回调函数
        JSUtil.execCallback(pWebview, CallBackID, newArray, JSUtil.OK, false);

    }

    public void PluginTestFunctionArrayArgu(IWebview pWebview, JSONArray array)
    {
        String ReturnString = null;
        String CallBackID =  array.optString(0);
        JSONArray newArray = null;
        try {

            newArray = new JSONArray( array.optString(1));          
            String inValue1 = newArray.getString(0);
            String inValue2 = newArray.getString(1);
            String inValue3 = newArray.getString(2);
            String inValue4 = newArray.getString(3);
            ReturnString = inValue1 + "-" + inValue2 + "-" + inValue3 + "-" + inValue4;
        } catch (JSONException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }

        JSUtil.execCallback(pWebview, CallBackID, ReturnString, JSUtil.OK, false);
    }

    public String PluginTestFunctionSyncArrayArgu(IWebview pWebview, JSONArray array)
    {
        JSONArray newArray = null;
        JSONObject retJSONObj = null;
        try {

            newArray = array.optJSONArray(0);
            String inValue1 = newArray.getString(0);
            String inValue2 = newArray.getString(1);
            String inValue3 = newArray.getString(2);
            String inValue4 = newArray.getString(3);

            retJSONObj = new JSONObject();
            retJSONObj.putOpt("RetArgu1", inValue1);
            retJSONObj.putOpt("RetArgu2", inValue2);
            retJSONObj.putOpt("RetArgu3", inValue3);
            retJSONObj.putOpt("RetArgu4", inValue4);

        } catch (JSONException e1) {
            e1.printStackTrace();
        }       

        return JSUtil.wrapJsVar(retJSONObj);
    }

    public String PluginTestFunctionSync(IWebview pWebview, JSONArray array)
    {
        String inValue1 = array.optString(0);
        String inValue2 = array.optString(1);
        String inValue3 = array.optString(2);
        String inValue4 = array.optString(3);

        String ReturnValue = inValue1 + "-" + inValue2 + "-" + inValue3 + "-" + inValue4;
        // 只能返回String类型到JS层。
        return JSUtil.wrapJsVar(ReturnValue,true);
    }


    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {

        super.onActivityResult(requestCode, resultCode, data);

        Log.i("dianji", "requestCode");
        Log.i("dianji", "resultCode");



    }

    private void setAlias(String phone) {

        String alias = phone;
        if (TextUtils.isEmpty(alias)) {
//            Toast.makeText(MainActivity.this,R.string.error_alias_empty, Toast.LENGTH_SHORT).show();
            return;
        }
//        if (!ExampleUtil.isValidTagAndAlias(alias)) {
//            Toast.makeText(PushSetActivity.this,R.string.error_tag_gs_empty, Toast.LENGTH_SHORT).show();
//            return;
//        }

        // 调用 Handler 来异步设置别名
        mHandler.sendMessage(mHandler.obtainMessage(MSG_SET_ALIAS, alias));
    }
    private final TagAliasCallback mAliasCallback = new TagAliasCallback() {
        @Override
        public void gotResult(int code, String alias, Set<String> tags) {
            String logs ;
            switch (code) {
                case 0:
                    logs = "Set tag and alias success";
                    Log.d("ceshi", logs);
                    Log.d("ceshi", alias);
                    // 建议这里往 SharePreference 里写一个成功设置的状态。成功设置一次后，以后不必再次设置了。
                    break;
                case 6002:
                    logs = "Failed to set alias and tags due to timeout. Try again after 60s.";
                    Log.d("ceshi", logs);
                    // 延迟 60 秒来调用 Handler 设置别名
                    mHandler.sendMessageDelayed(mHandler.obtainMessage(MSG_SET_ALIAS, alias), 1000 * 60);
                    break;
                default:
                    logs = "Failed with errorCode = " + code;
                    Log.d("ceshi", logs);
            }
//            ExampleUtil.showToast(logs, getApplicationContext());
        }
    };

    private static final int MSG_SET_ALIAS = 1001;
    private final Handler mHandler = new Handler() {
        @Override
        public void handleMessage(android.os.Message msg) {
            super.handleMessage(msg);
            switch (msg.what) {
                case MSG_SET_ALIAS:
                    Log.d("ceshi", "Set alias in handler.");
                    // 调用 JPush 接口来设置别名。

                    Log.d("ceshi", pContext+"");

                    JPushInterface.setAliasAndTags(pContext,
                            (String) msg.obj,
                            null,
                            mAliasCallback);
                    break;
                default:
                    Log.d("ceshi", "Unhandled msg - " + msg.what);
            }
        }
    };

}